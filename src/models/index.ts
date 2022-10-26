
export type PostBasicValues = {
  title: string;
  body: string;
};
export interface PostModelTypes extends PostBasicValues {
  id: number
  userId: number
}