export class User {
    readonly id: string | null;
    pseudo     : string;
    email      : string;
    name       : string;
    avatar     : string;

    constructor(options: {
     id?    : string,
     pseudo?: string,
     email? : string,
     name?  : string,
     avatar?: string,
    } = {}) {
     this.id     = options.id || null;
     this.pseudo = options.pseudo || '';
     this.email  = options.email || '';
     this.name   = options.name || '';
     this.avatar = options.avatar || '';
    }

}