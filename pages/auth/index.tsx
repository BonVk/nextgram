import { Box, Button, Container, Grid, Snackbar, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { forwardRef, useState } from "react";
import { supabase } from "../../utils/utils/supabase";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import * as React from 'react';



const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export default function Auth() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nameFirst, setNameFirst] = useState('');
    const [nameLast, setNameLast] = useState('');

    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");


    const handleAction = async () => {
        try {
            setLoading(true);
            if (isRegister) {
                const { data, error } = await supabase.auth.signUp({email, password})                
                    if (error) {
            setError(error.message);
            setOpen (true);
            throw error;
            }
            await supabase.from('users').insert({
                email: email,
                name_First: nameFirst,
                name_Last: nameLast,

            });

                router.push("/")
            
        } else {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) {
                setError(error.message);
                setOpen (true);
                throw error;
             } else {
                router.push("/")
             }
            }
            } finally {
            setLoading(false);
        }
    };

    return (
            <Container fixed>
            <Snackbar open={open} autoHideDuration={6000}>
                <Alert severity="error">{error}</Alert>
            </Snackbar>
                <Box sx={{ textAlign: "center" }}>
                <Button href="/">
                    <h1> NextGram</h1>
                </Button>
                    <h2>Auth</h2>
                </Box>
                <Grid 
                container 
                direction='column' 
                justifyContent="center"
                alignItems="center">
                <><TextField
                    id="standard-basic"
                    label="email"
                    variant="standard"
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                    <TextField
                        id="standard-basic"
                        label="password"
                        variant="standard"
                        type="password"
                        placeholder="Your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} /></>
                {isRegister ? (
                   <><TextField
                        id="standard-basic"
                        label="Name first"
                        variant="standard"
                        type="text"
                        placeholder="Name first"
                        onChange={(e) => setNameFirst(e.target.value)} />
                        <TextField
                            id="standard-basic"
                            label="Name last"
                            variant="standard"
                            type="text"
                            placeholder="Name last"
                            onChange={(e) => setNameLast(e.target.value)} /></>
                            ) : (
                       <></>
                )}

                <Button onClick={handleAction} variant="text">
                    {loading ? "Loading" : isRegister ? "Sing up" : "Sing in"}
                </Button>
                <Button onClick={(e) => {
                    setIsRegister(!isRegister);
                }}
                    variant="text"
                >
                    {isRegister ? "Still have no account" : "Already have an account"}
                </Button>
                </Grid>
            </Container>
    )}