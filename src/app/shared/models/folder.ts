export interface Folder {
    _id?                 : string;
    user_id?             : string;
    name?                : string;
    folderParent_id      : string | null;
    repository_parent_id?: string | null;
    project_id?          : string | null;
}