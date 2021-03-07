import { Card, CardContent, CardHeader, CardProps, makeStyles } from '@material-ui/core'
import React from 'react'

export type TileProps = CardProps & {
    title: string;
}

const useStyle = makeStyles(theme => ({
    content: {
        height: "calc(100% - 48px)"
    }
}), { name: "Tile" })

const Tile = (props: TileProps) => {

    const { title, children, ...rest } = props;
    const classes = useStyle(props);

    return (
        <Card {...rest} component="section">
            <CardHeader title={title} />
            <CardContent className={classes.content}>
                {children}
            </CardContent>
        </Card>
    )
}

export default Tile
