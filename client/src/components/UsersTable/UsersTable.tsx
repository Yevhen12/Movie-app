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
import styles from './UsersTable.module.scss'

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
    createData('43647f8y', "November 22, 2022", "Romance"),
    createData('43647f8y', "November 22, 2022", "Romance"),
    createData('43647f8y', "November 22, 2022", "Romance"),
    createData('43647f8y', "November 22, 2022", "Romance"),
    createData('43647f8y', "November 22, 2022", "Romance"),
];

const UsersTable: React.FC<{ users: any }> = ({ users }) => {
    return (
        <TableContainer style={{ marginTop: '20px' }} component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">Image</StyledTableCell>
                        <StyledTableCell align="center">Id</StyledTableCell>
                        <StyledTableCell align="right">Fullname</StyledTableCell>
                        <StyledTableCell align="right">Role</StyledTableCell>
                        <StyledTableCell align="right">Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((row: any) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell align="left">{row.image}</StyledTableCell>
                            <StyledTableCell align="center">{row.id}</StyledTableCell>
                            <StyledTableCell align="right">{row.fullname}</StyledTableCell>
                            <StyledTableCell align="right">{row.role}</StyledTableCell>
                            <StyledTableCell align="right">
                            <div className='btnContainer'>
                                    <Button className={styles.editBtn}>
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

export default UsersTable