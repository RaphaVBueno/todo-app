import React from 'react'
import { Dialog, Box, Button } from '@mui/material'
import AutoCompletePerfil from './AutoCompletePerfil'
import BotaoPadrao from '@/components/BotaoPadrao'

type EditDialogProps = {
    open: boolean
    onClose: () => void
    onSave: (newRole: string) => void
    usersRole: string
    setUsersRole: React.Dispatch<React.SetStateAction<string>>
}

const EditDialog: React.FC<EditDialogProps> = ({
    open,
    onClose,
    onSave,
    usersRole,
    setUsersRole,
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                style: {
                    width: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '20px',
                },
            }}
            BackdropProps={{
                style: {
                    backgroundColor: 'transparent', // Remove o fundo escuro
                },
            }}
        >
            <Box>
                <Box sx={{ p: 0, mt: '4px', mb: '4px' }}>
                    <AutoCompletePerfil usersRole={usersRole} setUsersRole={setUsersRole} />
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '16px',
                }}
            >
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => onSave(usersRole)}
                    sx={{
                        height: '40px',
                        width: '130px',
                        fontSize: '1rem',
                        marginRight: 2,
                    }}
                >
                    Salvar
                </Button>
                <BotaoPadrao buttonName="Cancelar" action={onClose} />
            </Box>
        </Dialog>
    )
}

export default EditDialog
