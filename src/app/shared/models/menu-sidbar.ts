export interface MenuSidebar {
    title         : string;
    path          : string;
    icon?         : string;
    picture?      : string;
    buttonContent?: string;
    infoCardText? : string[];
    type          : 'text' | 'card-menu';
}