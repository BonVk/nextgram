import React from 'react';
import { supabase } from './supabase';
//import supabase from '@supabase/supabase-js'


const usePhotos = () => {
    const [photos, setPhotos] = React.useState<any>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() =>{
        (async () => {
            setIsLoading(true);

            const response = await supabase.from('photos').select();
            setPhotos(response.data);
            setIsLoading(false);
        })();

    }, []);

    return [photos, isLoading];

};

export default usePhotos;