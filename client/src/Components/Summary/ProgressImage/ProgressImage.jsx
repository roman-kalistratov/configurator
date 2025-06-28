import { Box } from '@mui/material';
import UpgradeZone from './UpgradeZone';
import { images } from '@/assets';

const ProgressImage = () => {
  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
      }}
    >
      <img src={images.caseVector} width='100%' alt='pc case' loading='lazy' />

      <UpgradeZone
        idnt='299'
        partTitle='Case'
        left='0'
        top='0'
        width='100%'
        height='100%'
        title='CASE'
        isCase={true}
        imageUrl={images.casePC}
      />
      <UpgradeZone
        idnt='291'
        left='5%'
        partTitle='Motherboards'
        top='14%'
        width='50%'
        height='57%'
        title='MB'
        imageUrl={images.mb}
      />
      <UpgradeZone
        idnt='289'
        partTitle='Processor'
        left='28%'
        top='28.5%'
        width='9%'
        height='9%'
        title='CPU'
        zIndex={3}
        imageUrl={images.cpu}
      />
      <UpgradeZone
        idnt='290'
        partTitle='CPU Cooler'
        left='23.5%'
        top='23%'
        width='18%'
        height='20%'
        title='COOLER'
        zIndex={2}
        imageUrl={images.cooler}
      />

      <UpgradeZone
        idnt='292'
        partTitle='Memory'
        left='41%'
        top='17%'
        width='8%'
        height='27%'
        title='RAM'
        imageUrl={images.ram}
      />
      <UpgradeZone
        idnt='1310'
        partTitle='Solid-State Drives (SSD)'
        left='13%'
        top='49%'
        width='25%'
        height='6%'
        title='SSD1'
        imageUrl={images.ssdM2}
      />
      <UpgradeZone
        idnt='18938'
        partTitle='Solid-State Drives (SSD)'
        left='61%'
        top='17%'
        width='16%'
        height='15%'
        title='SSD2'
        imageUrl={images.ssd}
      />
      <UpgradeZone
        idnt='19140'
        partTitle='Solid-State Drives (SSD)'
        left='61%'
        top='35%'
        width='16%'
        height='15%'
        title='SSD3'
        imageUrl={images.ssd}
      />
      <UpgradeZone
        idnt='293'
        partTitle='VGA Cards'
        left='12%'
        top='44%'
        width='40%'
        height='5%'
        title='GPU1'
        imageUrl={images.gpu}
      />
      <UpgradeZone
        idnt='18936'
        partTitle='VGA Cards'
        left='12%'
        top='56%'
        width='40%'
        height='5%'
        title='GPU2'
        imageUrl={images.gpu}
      />
      <UpgradeZone
        idnt='18937'
        partTitle='VGA Cards'
        left='12%'
        top='63%'
        width='40%'
        height='5%'
        title='GPU3'
        imageUrl={images.gpu}
      />
      <UpgradeZone
        idnt='298'
        partTitle='Power Supply'
        left='6%'
        top='74%'
        width='41%'
        height='13%'
        title='POWER'
        imageUrl={images.power}
      />
      <UpgradeZone
        idnt='7669'
        partTitle='Hard Disk'
        left='60%'
        top='68%'
        width='19%'
        height='5%'
        title='HDD1'
        imageUrl={images.hdd}
      />
      <UpgradeZone
        idnt='18939'
        partTitle='Hard Disk'
        left='60%'
        top='74%'
        width='19%'
        height='5%'
        title='HDD2'
        imageUrl={images.hdd}
      />
      <UpgradeZone
        idnt='19139'
        partTitle='Hard Disk'
        left='60%'
        top='80%'
        width='19%'
        height='5%'
        title='HDD3'
        imageUrl={images.hdd}
      />
    </Box>
  );
};

export default ProgressImage;
