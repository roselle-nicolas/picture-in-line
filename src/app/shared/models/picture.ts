export class Picture {
    _id?          : string;
    name          : string;
    url           : string;
    compressRatio?: number;
    user_id?      : string;
    repository_id?: string;
    operation_id? : string;
    size_in?      : number;
    size_output?  : number;
    percent?      : number;
    filename?     : string;
    originPath?   : string;

    constructor(option: {
        _id?          : string,
        name?         : string;
        url?          : string;
        compressRatio?: number;
        user_id?      : string;
        repository_id?: string;
        operation_id? : string;
        size_in?      : number;
        size_output?  : number;
        percent?      : number;
        filename?     : string;
        originPath?   : string;
    } = {}) { 
        this._id           = option._id || '';
        this.name          = option.name || '';
        this.url           = option.url || '';
        this.compressRatio = option.compressRatio || 70;
        this.user_id       = option.user_id || '';
        this.repository_id = option.repository_id || '';
        this.operation_id  = option.operation_id || '';
        this.size_in       = option.size_in || 0;
        this.size_output   = option.size_output || 0;
        this.percent       = option.percent || 0;
        this.filename      = option.filename || "";
        this.originPath    = option.originPath || "";
    }
}
