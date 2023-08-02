import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';


const Barchart = ({data}) => {
  return (
   <ResponsiveContainer width='100%' height={300}>
       <BarChart data={data} margin={{top:50}}><CartesianGrid strokeDasharray='3 3 '></CartesianGrid>
       <XAxis datakey={'date'}></XAxis>
       <YAxis allowDecimals={false}></YAxis>
       <Tooltip></Tooltip>
       <Bar dataKey='count' fill ='#2cb1bb'  barSize={90}></Bar>
       </BarChart>

   </ResponsiveContainer>
  )
}

export default Barchart