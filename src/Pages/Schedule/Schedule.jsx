import React from 'react';
import './Schedule.css';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
import { Paper, Typography } from '@mui/material';
import { timelineData } from './scheduleData';

const About = () => {
  const CustomTimeline = () => {
    return (
      <Timeline className='timeline-main' position="alternate">
        {timelineData.map((card,index)=>(
          <TimelineItem>
            {/* <TimelineOppositeContent  className='timeline-oppcontent'>
              <Typography className='timeline-time' variant="body2" color="textSecondary">{card.date}</Typography>
            </TimelineOppositeContent> */}
            <TimelineSeparator className='timeline-separator'>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent className='timeline-content' >
              <Paper elevation={3} className='timeline-paper'>
                <div className={`timeline-paper-header ${index % 2 === 0 ? `timeline-right2`:'timeline-left2'}`}>
                  <Typography className='timeline-time' variant="body2" color="textSecondary">{card.date}</Typography>
                  &nbsp;-&nbsp;
                  <Typography variant="h6" sx={{color:'white'}} className='timeline-heading' component="h1">{card.heading}</Typography>
                </div>
                <div className={`timeline-body ${index % 2 === 0 ? `timeline-right`:'timeline-left'}`}>
                  <p>{card.description}</p>
                </div>
              </Paper>
            </TimelineContent>
        </TimelineItem>
        ))}
        
        
        
      </Timeline>
    );
  };
  return (
    <div className='home-overview-core'>
      <h1 className='home-overview-core-title'>Timeline</h1>
      <CustomTimeline/>
    </div>
  )
}

export default About







      
    
    