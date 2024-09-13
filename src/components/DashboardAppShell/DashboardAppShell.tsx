import { useSearchParams } from 'react-router-dom';
import { AppShell, em, Group, Image } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import Burger from '../../assets/icons/hamburger.png';
import VritikaLogo from '../../assets/vritika_logo.png';
import DashboardMain from '../DashboardMain/DashboardMain';
import PriceManagement from '../PriceManagement/PriceManagement';
import UserManagement from '../UserManagement/UserManagement';
import DashboardHeader from './Dashboardheader';
import DashboardNavbar from './DashboardNavbar';
import classes from './DashboardMain.module.css';

const AppShellMain = () => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const isMobile = useMediaQuery(`(max-width: ${em(600)})`);
  return (
    <AppShell
      header={{ height: isMobile ? 60 : 120 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header className={classes.headermain}>
        <Group h="100%" display="flex">
          <Group
            // w={300}
            // maw={300}
            display="flex"
            justify="space-between"
            h="100%"
            px="md"
            className={classes.header__left}
          >
            <Image src={VritikaLogo} />
            <Image src={Burger} onClick={toggleMobile} hiddenFrom="sm" />
            <Image src={Burger} onClick={toggleDesktop} visibleFrom="sm" />
          </Group>
          <DashboardHeader />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <DashboardNavbar />
        {/* Navbar
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))} */}
      </AppShell.Navbar>
      <AppShell.Main className={classes.main}>
        {type === 'main' && <DashboardMain />}
        {type === 'price' && <PriceManagement />}
        {type === 'user' && <UserManagement />}
      </AppShell.Main>
    </AppShell>
  );
};

export default AppShellMain;
