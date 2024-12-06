import { useState, useRef, Fragment } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import type { List } from '../types/list'
import Brightness1Icon from '@mui/icons-material/Brightness1'

type FilterButtonProps = {
  categories: List[]
  filter: number | null
  setFilter: Dispatch<SetStateAction<number | null>>
}

/**
 * Componente que renderiza um botão de filtro com um menu suspenso.
 *
 * @param props - Propriedades do componente
 * @param props.categories - Lista de categorias para o menu de filtro
 * @param props.filter - ID do filtro selecionado atualmente ou null para nenhum filtro
 * @param props.setFilter - Função para atualizar o filtro selecionado
 * @returns O componente FilterButton
 */
export default function FilterButton(props: FilterButtonProps) {
  const { categories, filter, setFilter } = props
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLDivElement>(null)
  const [filterName, setFilterName] = useState<string>('Filtro')

  /**
   * Alterna o estado de abertura do menu suspenso
   */
  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  /**
   * Define o filtro e fecha o menu suspenso
   *
   * @param optionName - Nome da opção selecionada
   * @param filterId - ID do filtro correspondente
   */
  const handleMenuItemClick = (optionName: string, filterId: number) => {
    setFilterName(optionName)
    setFilter(filterId)
    setOpen(false)
  }

  /**
   * Alterna o estado de abertura do menu suspenso.
   */
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  /**
   * Fecha o menu suspenso quando ocorre um clique fora do elemento associado.
   *
   * @param event - Evento de clique
   */
  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return
    }

    setOpen(false)
  }

  return (
    <Fragment>
      <ButtonGroup
        variant="outlined"
        ref={anchorRef}
        aria-label="Botão de filtro"
      >
        <Button onClick={handleClick}>{filterName}</Button>
        <Button
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{ zIndex: 1 }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  <MenuItem
                    key={'Todos'}
                    onClick={() => {
                      setFilterName('Filtro')
                      setFilter(null)
                      setOpen(false)
                    }}
                  >
                    Todos
                  </MenuItem>
                  {categories.map((option) => (
                    <MenuItem
                      key={option.name}
                      selected={option.id === filter}
                      onClick={() =>
                        handleMenuItemClick(option.name, option.id)
                      }
                    >
                      {
                        <>
                          <Brightness1Icon
                            style={{
                              color: `${option.color}`,
                              marginRight: '4px',
                              fontSize: 'small',
                            }}
                          />{' '}
                          {option.name}
                        </>
                      }
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Fragment>
  )
}
