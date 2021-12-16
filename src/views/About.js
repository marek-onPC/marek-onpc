import React, { useEffect, useState, useCallback  } from 'react';
import Pills from '../components/Pills';
import Timeline from '../components/Timeline';

export default function About() {
  const [content, setContent] = useState(null)
  const fetchAboutPageJSON = useCallback(async () => {
    try {
      const response = await fetch('https://ms-portfolio.eu/wp-json/wp/v2/pages/22')
      return await response.json()
    } catch(error) {
      console.log(error)
      setTimeout(() => {
        fetchAboutPageJSON()
      }, 2500)
    }
  }, [])

  document.title = 'about'

  useEffect(() => {
    fetchAboutPageJSON().then(data => {
      setContent(data)
    })
  }, [fetchAboutPageJSON])

  return (
    <div className='about container'>
      { content !== null &&
        <>
          <div dangerouslySetInnerHTML={ { __html: content.content.rendered } }></div>
          <h3 className='text-center border-bottom-50 mt-5'>Technology</h3>
          <Pills pills={ content.acf.technology.split(';') } />
          <h3 className='text-center border-bottom-50'>Timeline</h3>
          <Timeline events={ content.acf.timeline } />
        </>
      }
    </div>
  );
}
