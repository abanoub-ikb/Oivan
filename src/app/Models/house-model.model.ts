export interface IHouseModel {
    id: string
    type: string
    links: ILinks
    attributes: IAttributes
  };
  
  export interface ILinks {
    self: string
  };
  
  export interface IAttributes {
    model: string
    media: IMedia
    house_type: string
  };
  
  export interface IMedia {
    title: string
    video: string
    banner: string
    description: string
  };

  export type ModelInfo = { [key: string]: Partial<IMedia> }

