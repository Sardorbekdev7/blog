import { Sidebar } from "@/components"
import { BlogsType } from "@/interface/blogs.interface"
import Layout from "@/layout/layout"
import { BlogsService } from "@/services/blog-service"
import { GetServerSideProps } from "next"
import {Box, Typography, Avatar, Divider} from '@mui/material'
import { CategoryType } from "@/interface/categories.interface"
import Image from "next/image"
import { format } from 'date-fns'
import { calculateEstimatedTimeToRead } from "@/helpers/time.format"
import SEO from "@/layout/seo/Seo"
import { useRouter } from "next/router"

const DetailedBlogsPage = ({blog, latestBlogs, categories}: DetailedBlogsPageProps) => {
    const router = useRouter()
  return (
    <SEO metaTitle={`${router.query.slug}-blog`} >
        <Layout>
            <Box sx={{display: 'flex', flexDirection: {xs: 'column', md: 'row'}, gap: '20px', padding: '20px'}}>
                <Box width={{ xs: '100%', md: '70%'}}>
                    <Box 
                    sx={{ 
                        backgroundColor: 'black',
                        padding: '20px',
                        borderRadius: '8px',
                        boxShadow: '0px 8px 16px rgba(255, 255, 255, 0.1)'
                        }}
                        position={'relative'} width={"100%"} height={{xs: '30vh', md: '50vh'}}
                        >
                            <Image fill src={blog.image.url} alt={blog.title} style={{objectFit: 'cover', borderRadius: '10px'}} />
                        </Box>
                        <Box display={'flex'} flexDirection={"column"} rowGap={'10px'}>
                            <Box sx={{display: 'flex', gap: '10px', marginTop: '30px'}}>
                            <Avatar alt={blog.author.name} src={blog.author.avatar.url} />
                            <Box>
                                <Typography>{blog.author.name}</Typography>
                                <Box color={'gray'}>
                                {format(new Date(blog.createdAt), "dd MMM, yyyy")} &#x2022; {calculateEstimatedTimeToRead(blog.description.text)}min read
                                </Box>
                            </Box>
                            </Box>
                            <Typography variant="h3" marginTop={"20px"}>{blog.title}</Typography>
                            <Typography color={"gray"}>{blog.excerpt}</Typography>
                            <Divider />
                            <div style={{opacity: '0.8'}} dangerouslySetInnerHTML={{__html: blog.description.html}} />
                        </Box>
                </Box>
                <Sidebar latestBlogs={latestBlogs} categories={categories} />
        </Box>
        </Layout>
    </SEO>
  )
}

export default DetailedBlogsPage

export const getServerSideProps: GetServerSideProps<DetailedBlogsPageProps> = async({query}) => {
    const blog = await BlogsService.getDetailedBlogs(query.slug as string)
    const latestBlogs = await BlogsService.getLatestBlog()
    const categories = await BlogsService.getCategories()

    return {
        props: {
            blog,
            latestBlogs,
            categories,
        }
    }
}


interface DetailedBlogsPageProps {
    blog: BlogsType;
    latestBlogs: BlogsType[];
    categories: CategoryType[];
}