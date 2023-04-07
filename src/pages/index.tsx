import { Content, Hero, Sidebar } from '@/components'
import Layout from '@/layout/layout'
import {useEffect} from 'react'
import {Box} from '@mui/material'
import { BlogsService } from '@/services/blog-service'
import { GetServerSideProps } from 'next'
import { BlogsType } from '@/interface/blogs.interface'
import { CategoryType } from '@/interface/categories.interface'
import SEO from '@/layout/seo/Seo'

const Index = ({ blogs, latestBlogs, categories }: HomePageProps ) => {

  
  
  return (
    <SEO>
      <Layout>
        <Hero blogs = {blogs.slice(0, 3)} />
        <Box sx={{display: 'flex', flexDirection: {xs: 'column', md: 'row'}, gap: '20px', padding: '20px'}}>
          <Sidebar latestBlogs={latestBlogs} categories={categories} />
          <Content blogs={blogs} />
        </Box>
      </Layout>
    </SEO>
  )
}

export default Index

export const getServerSideProps: GetServerSideProps<HomePageProps> = async() => {
  const blogs = await BlogsService.getAllBLogs()
  const latestBlogs = await BlogsService.getLatestBlog()
  const categories = await BlogsService.getCategories()

  return {
    props: {
      blogs,
      latestBlogs,
      categories,
    }
  }
}

interface HomePageProps {
  blogs: BlogsType[];
  latestBlogs: BlogsType[];
  categories: CategoryType[];
}