import {styled} from "@mui/material/styles";
import {Paper} from "@mui/material";

const Item = styled(Paper)(({theme}) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
    marginTop: '15px',
    marginBottom: '15px'
}));

export default Item
