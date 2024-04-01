import { Category } from "@prisma/client";
import getCategory from "../action/getCategory"
import SearchComponent from "./SearchComponent"

export default async function Shop() {
    const tagList: Category[] = await getCategory();
    return (
      <SearchComponent tagList={tagList} />
    )
}
  