import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import styles from './CategoryTable.module.scss'
import { getCounter, setCounter } from '@/redux/slices/counterSlice';
import useAppSelector from '@/hooks/useAppSelector';
import { AppState } from '@/redux/store';
import useAppDispatch from '@/hooks/useAppDispatch';
import { userService } from '@/services/user.service';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        color: 'white'
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&': {
        backgroundColor: 'rgb(8 10 26)',
    },
    '& td, & th': {
        borderColor: 'rgba(31, 41, 55, 0.6)'
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        borderColor: 'rgba(31, 41, 55, 0.6)',
        border: 0,
    },
}));

function createData(
    id: string,
    date: string,
    category: string,
) {
    return { id, date, category };
}

const rows = [
    createData('434647f38y', "November 22, 2022", "Romance"),
    createData('4364g73f8y', "November 22, 2022", "Romance"),
    createData('43644f7f8y', "November 22, 2022", "Romance"),
    createData('4364d7rf8y', "November 22, 2022", "Romance"),
    createData('436473f8y', "November 22, 2022", "Romance"),
];

const CategoryTable: React.FC<{ categories: any }> = ({ categories }) => {
    const dispatch = useAppDispatch();
    const { counter } = useAppSelector(getCounter)
    React.useEffect(() => {
        const getAllUsers = async () => {
            const users = await userService.getAll()
            console.log('users', users)
        }
        console.log(userService)

        getAllUsers()
    }, [])
    console.log('some', counter)
    return (
        <TableContainer style={{ marginTop: '20px' }} component={Paper}>
            <Button className={styles.editBtn} onClick={() => dispatch(setCounter(5))}>
                Edit
            </Button>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">Id</StyledTableCell>
                        <StyledTableCell align="center">Date</StyledTableCell>
                        <StyledTableCell align="right">Category</StyledTableCell>
                        <StyledTableCell align="right">Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories.map((row: any) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell align="left">{row.id}</StyledTableCell>
                            <StyledTableCell align="center">{row.date}</StyledTableCell>
                            <StyledTableCell align="right">{row.category}</StyledTableCell>
                            <StyledTableCell align="right">
                                <div className='btnContainer'>
                                    <Button className={styles.editBtn} onClick={() => dispatch(setCounter(5))}>
                                        Edit
                                    </Button>
                                    <Button className={styles.deleteBtn}>
                                        Delete
                                    </Button>
                                </div>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CategoryTable