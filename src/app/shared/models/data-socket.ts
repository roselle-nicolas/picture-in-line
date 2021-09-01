import { Picture } from "./picture";

interface StarCompressFiles {
    _id?              : string
    compressPictureId?: string;
    user_id?          : string;
    numberOfPictures?  : number;
}

export interface DataSocket {
    startCompressFiles?       : StarCompressFiles;
    compressAllPicturesFinish?: boolean;
    downloadAllPicturesFinish?: boolean;
    conpressOnePictureFinish? : Picture;
}