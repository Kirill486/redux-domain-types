export class Timer {
    private time?: number;

    get timeSet() {
        return !!this.time;
    }

    start() {
        if (this.timeSet) {
            throw WrongTimerOperation();
        }

        this.time = Date.now();
    }

    stop() {
        if (!this.timeSet) {
            throw WrongTimerOperation();
        }
        const time = Date.now() - this.time;
        this.time = undefined;

        return time;
    }
}

export const WrongTimerOperation = () => new Error('Wrong timer operation');

export const timer = () => Date.now();
export const stopWatch = (timer: number) => timer