import React, { useState, useEffect } from 'react'

//components
import ContentItem from '../content-item'

//@material
import { Button, Box, Container, Grid } from '@material-ui/core'

const Content = () => {

    const [data, setData] = useState([]);
    const [nextPage, setNextPage] = useState('');
    const [links, setLinks] = useState([]);


    //FIRST COMMENTS 
    useEffect(() => {
        const getComments = async () => {
            const response = await fetch('https://jordan.ashton.fashion/api/goods/30/comments?page=1');
            return response.json();
        }

        getComments()
            .then(comments => {
                setData(comments.data);
                setNextPage(comments.next_page_url);
                setLinks(comments.links);
                console.log(comments.links)
            });
    }, [])

    // NEXT COMMENTS
    const getNextComments = async () => {
        const response = await fetch(`${nextPage}`);
        const comments = response.json();

        return comments;
    };

    //
    const getCommentsPage = async (url) => {
        const response = await fetch(`${url}`);
        const comment = response.json();

        return comment;
    };
    const splitNameBtn = (item, i) => {
        const items = item.split(' ');
        const nameBtn = items[i === 0 ? 1 : 0];
        const normilizeSymbol = `\//` + items[i === 0 ? 0 : 1];


        return [nameBtn, normilizeSymbol];
    }

    return (
        <Box >
            <Container fixed >
                <Grid container direction="column" alignItems="flex-start" >
                    {data.map(item => <ContentItem key={item.id} name={item.name} text={item.text} />)}
                    <Grid container item justifyContent='center' >
                        {!!nextPage &&
                            <Button variant="contained" style={{ textTransform: "uppercase", marginBottom: "20px", padding: "15px 25px" }}
                                onClick={() => {
                                    getNextComments().then(comment => {
                                        setData(data.concat(comment.data));
                                        setNextPage(comment.next_page_url);
                                    })
                                }}
                            >show more</Button>
                        }
                    </Grid>
                    <Grid xs={12}
                        container
                        item
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        style={{ margin: "0 5px" }}
                    >
                        {links.map((item, i) => {
                            return <button

                                onClick={() => getCommentsPage(item.url).then(comment => {
                                    setData(comment.data);
                                    setNextPage(comment.next_page_url);
                                    setLinks(comment.links);

                                })}>
                                {typeof item.label === 'string' ? splitNameBtn(item.label) : item.label}
                            </button >
                        })}

                    </Grid>

                </Grid>

            </Container>

        </Box>
    )
}

export default Content;
