import {createjob,getalljobs,updatejob,deletejob,showstats} from '../controllers/jobscontroller.js'
import express from 'express'
const router=express.Router()


router.route('/').post(createjob).get(getalljobs)
router.route('/stats').get(showstats)
router.route('/:id').delete(deletejob).patch(updatejob)

export default router