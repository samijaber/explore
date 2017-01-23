export interface PhotoType {
  obj?: any;
}

export interface CollectionType {
  isFetching?: boolean;
  metadata?: {
    id: string;
    description: string;
  };
  photos?: Array<PhotoType>;
  collectionIds?: Array<number>;
}

export interface State {
  selectedCollection?: string;
  collections?: {
    [id: number]: CollectionType;
  };
}
