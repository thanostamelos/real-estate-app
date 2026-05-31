import { memo, useCallback, useMemo } from 'react'
import { useTheme } from '@mui/material/styles'
import {
  Box,
  ClickAwayListener,
  Divider,
  List,
  Paper,
  Popper,
} from '@mui/material'
import {
  IconBuilding,
  IconHelp,
  IconSearch,
  IconUpload,
  IconUser,
} from '@tabler/icons-react'
import PopperListItem from './PopperListItem'
import MainCard from '../../../utils/general/MainCard'
import { useNavigate } from 'react-router-dom'

const popperModifiers = [
  {
    name: 'offset',
    options: {
      offset: [0, 8],
    },
  },
]

const SearchIcon = <IconSearch />
const UploadIcon = <IconUpload />
const HelpIcon = <IconHelp />
const OwnerIcon = <IconUser />
const AgencyIcon = <IconBuilding />

const ProfileSectionPopperMenu = ({ open, setOpen, anchorRef }) => {
  const theme = useTheme()
  const navigate = useNavigate()

  const listStyles = useMemo(
    () => ({
      width: '100%',
      maxWidth: 350,
      minWidth: 300,
      backgroundColor: theme.palette?.background?.default,
      borderRadius: '10px',
      [theme.breakpoints.down('md')]: {
        minWidth: '100%',
      },
      '& .MuiListItemButton-root': {
        mt: 0.5,
      },
    }),
    [theme.palette?.background?.default, theme.breakpoints],
  )

  const mainCardSx = useMemo(
    () => ({ backgroundColor: theme.palette?.background?.default }),
    [theme.palette?.background?.default],
  )

  const handleClose = useCallback(
    (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return
      }
      setOpen(false)
    },
    [anchorRef, setOpen],
  )

  const handleHome = useCallback(() => {
    navigate('/')
    setOpen(false)
  }, [setOpen, navigate])

  const handleUploadProperty = useCallback(() => {
    navigate('/new-listing')
    setOpen(false)
  }, [setOpen, navigate])

  const handleOwnerDashboard = useCallback(() => {
    navigate('/owner-dashboard')
    setOpen(false)
  }, [setOpen, navigate])

  const handleAgencyDashboard = useCallback(() => {
    navigate('/agency-dashboard')
    setOpen(false)
  }, [setOpen, navigate])

  const handlePrivacyNoticeClick = useCallback(() => {}, [])

  return (
    <>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        disablePortal
        modifiers={popperModifiers}
        sx={{ zIndex: (t) => t.zIndex.drawer + 2 }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <Paper>
            {open && (
              <MainCard
                sx={mainCardSx}
                border={false}
                elevation={16}
                content={false}
                boxShadow
                shadow={theme.shadows[16]}
              >
                <Box sx={{ p: 2, pt: 0 }}>
                  <List component="nav" sx={listStyles}>
                    <PopperListItem
                      onClick={handleHome}
                      itemLabel={'Find House'}
                      icon={SearchIcon}
                    />
                    <PopperListItem
                      onClick={handleUploadProperty}
                      itemLabel={'Upload a Property'}
                      icon={UploadIcon}
                    />
                    <PopperListItem
                      onClick={handleOwnerDashboard}
                      itemLabel={'Owner Dashboard'}
                      icon={OwnerIcon}
                    />
                    <PopperListItem
                      onClick={handleAgencyDashboard}
                      itemLabel={'Agency Dashboard'}
                      icon={AgencyIcon}
                    />
                    <Divider sx={{ my: 1 }} />
                    <PopperListItem
                      onClick={handlePrivacyNoticeClick}
                      itemLabel={'Help'}
                      icon={HelpIcon}
                    />
                    <Divider sx={{ my: 1 }} />
                  </List>
                </Box>
              </MainCard>
            )}
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  )
}

export default memo(ProfileSectionPopperMenu)
