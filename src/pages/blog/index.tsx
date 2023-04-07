import { Content } from "@/components"
import { BlogsType } from "@/interface/blogs.interface"
import Layout from "@/layout/layout"
import { BlogsService } from "@/services/blog-service"
import { GetServerSideProps } from "next"
import { Box } from '@mui/material'
import SEO from "@/layout/seo/Seo"

const BlogPage = ({blogs} : BlogPageProps) => {
  return (
    <SEO metaTitle="All blogs">
        <Layout>
            <Box sx={{display: 'flex', flexDirection: {xs: 'column', md: 'row'}, gap: '20px', padding: '20px', justifyContent: 'center'}}>
                <Content blogs={blogs} />
            </Box>
        </Layout>
    </SEO>
  )
}

export default BlogPage

export const getServerSideProps: GetServerSideProps<BlogPageProps> = async() => {
    const blogs = await BlogsService.getAllBLogs()
    return {
        props: { blogs },
    }
}

interface BlogPageProps {
    blogs: BlogsType[]
}
