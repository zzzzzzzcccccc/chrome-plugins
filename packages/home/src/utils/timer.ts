type Callback = () => void;
type TimerType = 'timeout' | 'interval';
type QueueItem = {
  type: TimerType;
  interval: number;
  rafId: number;
};
type SetQueuePayload = {
  id: symbol;
  type: TimerType;
  loop: Callback;
  interval: number;
};

class Timer {
  private queue = new Map<symbol, QueueItem>();

  static getCurrentTime() {
    return Date.now();
  }

  private start(type: TimerType, callback: Callback, interval: number) {
    if (interval <= 0) {
      throw new Error('interval must be > 0');
    }
    let startTime = Timer.getCurrentTime(),
      endTime = startTime;
    const timerId = Symbol(type);
    const loop = () => {
      this.pushQueue({ id: timerId, type, loop, interval });

      endTime = Timer.getCurrentTime();

      if (endTime - startTime >= interval) {
        if (type === 'interval') {
          startTime = Timer.getCurrentTime();
          endTime = startTime;
        } else {
          this.clean(timerId);
        }

        callback();
      }
    };
    this.pushQueue({ id: timerId, type, loop, interval });
    return timerId;
  }

  private clean(id: symbol) {
    const item = this.queue.get(id);
    if (item) {
      cancelAnimationFrame(item.rafId);
      this.queue.delete(id);
    }
  }

  private pushQueue({ id, type, loop, interval }: SetQueuePayload) {
    const rafId = requestAnimationFrame(loop);
    this.queue.set(id, { type, interval, rafId });
  }

  public setTimeout(callback: Callback, delay: number) {
    return this.start('timeout', callback, delay);
  }

  public setInterval(callback: Callback, interval: number) {
    return this.start('interval', callback, interval);
  }

  public clearTimeout(timerId: symbol) {
    this.clean(timerId);
  }

  public clearInterval(timerId: symbol) {
    this.clean(timerId);
  }
}

const timer = new Timer();

export default timer;
