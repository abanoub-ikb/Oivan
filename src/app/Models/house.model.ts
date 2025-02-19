export interface IHouse {
    id: string
    type: string
    links: ILinks
    attributes: IHouseAttributes
  }
  
  export interface ILinks {
    self: string
  }
  
  export interface IHouseAttributes {
    house_number: string
    price: number
    block_number: string
    land_number: string
    house_type: string
    model: string
    status: string
  }
  