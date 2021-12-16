import React, { useEffect, useState, useCallback  } from 'react';

export default function Note() {
  const [note, setNote] = useState(null)
  const fetchNoteJSON = useCallback(async () => {
    let noteUrl = new URL(window.location.href);
    let noteId = noteUrl.searchParams.get('id');

    if (noteId === null || noteId === '') {
      window.location.replace('/note?id=706')
    } else {
      try {
        const response = await fetch('https://ms-portfolio.eu/wp-json/wp/v2/posts/' + noteId)
        return await response.json()
      } catch(error) {
        console.log(error)
        if (error.response.data.data.status === 404) {
          window.location.replace('/404')
        } else {
          setTimeout(() => {
            fetchNoteJSON()
          }, 2500)
        }
      }
    }


  }, [])

  document.title = 'note'

  useEffect(() => {
    fetchNoteJSON().then(data => {
      setNote(data)
    })
  }, [fetchNoteJSON])

  return (
    <div className=' note container'>
    { note &&
      <>
        <div className='note__header'>
          <img className='note__thumbnail' src={ note.better_featured_image.source_url } alt={ note.better_featured_image.media_details.file } />
          <h1 className='note__title' dangerouslySetInnerHTML={ { __html: note.title.rendered } }></h1>
        </div>
        <div className='wp-rendered-content note__content' dangerouslySetInnerHTML={ { __html: note.content.rendered } }></div>
      </>
    }
    </div>
  );

}
