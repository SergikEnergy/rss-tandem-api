export interface IHealthService {
    checkAlive(): Promise<string>;
}

export interface IHealthStore {
    checkAlive(): Promise<string>;
}
