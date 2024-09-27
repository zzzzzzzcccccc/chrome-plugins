export async function concurrentPromise<R = unknown>(
  tasks: Array<() => Promise<R>>,
  max = 1,
  enableReturnError = false,
) {
  const len = tasks.length;
  const result: Record<string, { data?: R; error?: unknown }> = {};
  if (len <= 0) {
    return {};
  }

  const runTask = async (index: number) => {
    const task = tasks[index];
    if (enableReturnError) {
      const data = await task();
      result[index] = data as { data?: R; error?: unknown };
    } else {
      try {
        const data = await task();
        result[index] = { data };
      } catch (error) {
        result[index] = { error };
      }
    }
  };

  const run = async (index: number) => {
    if (index >= len) {
      return;
    }
    const next = index + max;
    const group = tasks.slice(index, next).map((_, groupIndex) => {
      const cur = index + groupIndex;
      return runTask(cur);
    });

    await Promise.all(group);
    await run(next);
  };

  await run(0);

  return result;
}
