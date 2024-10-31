import { useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

import { Theme, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import { List } from '../types/list'
import { Tag } from '../types/tag'

type MultiSelectProps = {
  categories: List[]
  tags: Tag[]
  setTagId: Dispatch<SetStateAction<number[]>>
  taskTagsId: Tag[]
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

function getStyles(name: string, tagName: readonly string[], theme: Theme) {
  return {
    fontWeight: tagName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  }
}

export default function MultiSelect(props: MultiSelectProps) {
  const { tags, setTagId, taskTagsId } = props
  const theme = useTheme()
  const [tagName, setTagName] = useState<string[]>(
    taskTagsId.map((tag) => tag.name)
  )

  const handleChange = (event: SelectChangeEvent<typeof tagName>) => {
    const {
      target: { value },
    } = event
    const selectedTagNames =
      typeof value === 'string' ? value.split(',') : value
    setTagName(selectedTagNames)

    const selectedTagIds = tags
      .filter((tag) => selectedTagNames.includes(tag.name))
      .map((tag) => tag.id)

    setTagId(selectedTagIds)
  }

  //const handleChange = () =>

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={tagName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {tags.map((tag) => (
            <MenuItem
              key={tag.name}
              value={tag.name}
              style={getStyles(tag.name, tagName, theme)}
            >
              {tag.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
