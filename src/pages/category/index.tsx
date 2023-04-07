import { CategoryType } from "@/interface/categories.interface"
import Layout from "@/layout/layout"
import { BlogsService } from "@/services/blog-service"
import { GetServerSideProps } from "next"
import { Box, Typography, ButtonGroup, Button } from '@mui/material'
import { useRouter } from "next/router"
import SEO from "@/layout/seo/Seo"

const CategoryPage = ( {categories} : CategoryPageProps) => {
    const router = useRouter()
  return (
    <SEO metaTitle="All categories">
        <Layout>
            <Box 
            width={{ xs: '100%', md: '80%'}}
            marginX={'auto'}
            marginTop={"10vh"}
            borderRadius={'8px'}
            height={{ xs: '30vh', md: '50vh'}} 
            sx={{ backgroundColor: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', rowGap: '10px' }}>
                <Typography variant="h3" fontFamily={"cursive"}>All categories</Typography>
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                    {categories.map(item => (
                        <Button onClick={()=> router.push(`/category/${item.slug}`)} key={item.slug}># {item.label}</Button>
                    ))}
                </ButtonGroup>
            </Box>
        </Layout>
    </SEO>
  )
}

export default CategoryPage

export const getServerSideProps: GetServerSideProps<CategoryPageProps> = async() => {
    const categories = await BlogsService.getCategories()
    return {
        props: { categories }
    }
}

interface CategoryPageProps {
    categories: CategoryType[]
}
