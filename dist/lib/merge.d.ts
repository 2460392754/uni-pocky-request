import { IMergeBeforeConfig, IMergeAfterConfig } from '../interface';
export declare const merge: (globalConfig: IMergeAfterConfig | IMergeBeforeConfig, instanceConfig?: IMergeBeforeConfig) => IMergeAfterConfig;
