type Singleton<T> = { new (): T; instance?: T };

abstract class CommonManager {
    protected constructor() {
        if (new.target === CommonManager) {
            throw new Error("Cannot instantiate abstract class CommonManager.");
        }
    }

    public static getInstance<T>(this: Singleton<T>): T {
        if (!this.instance) {
            this.instance = new this();
        }
        return this.instance;
    }
}
