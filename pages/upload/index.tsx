import { Button, Container, Grid, Input } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { supabase } from '../../utils/utils/supabase'

export default  function Upload() {
    
    const [uploading, setUploading] = useState(false)
    
 
    const uploadAvatar = async (event: any) => {
        try {
            setUploading(true)

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.')
            }
            
            const file = event.target.files[0]
            const fileExt = file.name.split('.').pop()
            const fileName = `{fileExt}`
            const filePath = `${fileName}`

            let { error: uploadError, data } = await supabase.storage
                .from('photos')
                .upload(filePath, file, { upsert: true })

            if (uploadError) {
                throw uploadError
            }
            supabase.storage
                .from('photos')
                .getPublicUrl(filePath)
    



        } catch (error: any) {
            alert('Error uploading avatar!')
            console.log(error)
        } finally {
            setUploading(false)
        }
    }

    return (
        <Container fixed>
           
            <Grid container  direction="column"justifyContent="space-around" alignItems="center">
            <Button href="/">
          <h1> NextGram</h1>
          </Button>
                <label htmlFor='contained-button-file'>
                    <input
                        style={{
                            visibility: 'hidden',
                            position: 'absolute',
                        }}
                        type="file"
                        id="single"
                        accept="image/*"
                        onChange={uploadAvatar}
                        disabled={uploading}
                    />
                    <Button variant="contained" component="label">
                        {uploading ? 'Uploading ...' : 'Upload'}
                    </Button>
                </label>
                </Grid>
                </Container>
    )



}
