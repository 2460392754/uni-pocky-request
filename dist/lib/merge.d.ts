import { IMergeBeforeConfig, IMergeAfterConfig } from '../interface';
export declare const merge: (globalConfig: IMergeBeforeConfig | IMergeAfterConfig, instanceConfig?: IMergeBeforeConfig) => IMergeAfterConfig;
