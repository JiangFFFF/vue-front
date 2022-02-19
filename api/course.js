import request from '@/utils/request'
export default({
    //条件查询带分页课程的查询
    getCourseList(page,limit,searcheObj){
        return request({
            url:`/eduservice/coursefront/getFrontCourseList/${page}/${limit}`,
            method:'post',
            data:searcheObj
        })
    },
    //查询所有分类的方法
    getAllSubject(){
        return request({
            url:`/eduservice/subject/getAllSubject`,
            method:'get'
        })
    },
    //课程详情方法
    getCourseInfo(courseId){
        return request({
            url:`/eduservice/coursefront/getFrontCourseInfo/${courseId}`,
            method:'get'
        })
    }
})