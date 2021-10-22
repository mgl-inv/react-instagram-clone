import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { storage, db } from './firebase'
import firebase from 'firebase'

import './ImageUpload.css'

function ImageUpload({ username }) {
    const [image, setImage] = useState(null)
    const [caption, setCaption] = useState('')
    const [progress, setProgress] = useState(0)

    const handleChange = (event) => {
        if (event.target.files[0]) {
            setImage(event.target.files[0])
        }
    }

    const handleUpload = () => {
        if (image) {
            const uploadTask = storage.ref(`images/${image.name}`).put(image)
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // progress func
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    )
                    setProgress(progress)
                },
                (error) => {
                    // error func...
                    console.log(error)
                    alert(error.message)
                },
                () => {
                    // complete func...
                    storage
                        .ref('images')
                        .child(image.name)
                        .getDownloadURL()
                        .then((url) => {
                            db.collection('posts').add({
                                timestamp:
                                    firebase.firestore.FieldValue.serverTimestamp(),
                                caption: caption,
                                imageUrl: url,
                                username: username
                            })

                            setProgress(0)
                            setCaption('')
                            setImage(null)
                        })
                }
            )
        } else {
            alert('Pick the image')
        }
    }

    return (
        <div className='imageupload'>
            <div className='imageupload__container'>
                <progress
                    className='imageupload__progress'
                    value={progress}
                    max='100'
                />
                <div className='imageupload__inputs'>
                    <input
                        className='imageupload__textInput'
                        type='text'
                        placeholder='Enter a caption...'
                        onChange={(event) => setCaption(event.target.value)}
                    />
                    <input
                        className='imageupload__fileInput'
                        type='file'
                        onChange={handleChange}
                    />
                </div>
                <Button onClick={handleUpload}>Upload</Button>
            </div>
        </div>
    )
}

export default ImageUpload
