interface CategoryPageProps {
  params: {
    id: string
  }
}

const CategoryPage = ({ params: { id } }: CategoryPageProps) => {
  return <main>{id}</main>
}

export default CategoryPage
