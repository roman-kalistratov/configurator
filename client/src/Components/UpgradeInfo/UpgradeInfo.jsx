import Specifications from './Components/Specifications/Specifications';
import LinkActions from './Components/LinkActions/LinkActions';
import * as S from './style';
import UpgradeHero from './Components/UpgradeHero/UpgradeHero';

export function parseSpecificationHtml(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const result = {};
  const bolds = doc.querySelectorAll('b');

  bolds.forEach((b) => {
    const key = b.textContent.trim();

    // берём следующий текстовый узел (value)
    let value = '';
    let node = b.nextSibling;
    while (node) {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent.trim();
        if (text) {
          value = text;
          break;
        }
      }
      node = node.nextSibling;
    }

    if (key && value) {
      result[key] = value;
    }
  });

  return result;
}

const UpgradeInfo = () => {
  const data = demoItem.result;
  const title = data.data.name;
  const subtitle = data.data.smalldesc;

  const mainImg = data.images.find((item) => item.img_id === '4')?.sizes.l.src;

  const upgradeMainLink = demoItem.seo.myUrl;
  const manufacturerLink = data.specification.links.find(
    (l) => l.type === 'manufacturer',
  )?.url;

  const specificationBody =
    data.specification.items.find((item) => item.head === 'מפרט')?.body || '';
  const specification = parseSpecificationHtml(specificationBody);

  return (
    <S.UpgradeInfoWrapper>
      <S.StyledContainer container spacing={2}>
        <UpgradeHero title={title} subtitle={subtitle} mainImg={mainImg} />

        <LinkActions
          upgradeMainLink={upgradeMainLink}
          manufacturerLink={manufacturerLink}
        />
      </S.StyledContainer>

      <Specifications specification={specification} />
    </S.UpgradeInfoWrapper>
  );
};

export default UpgradeInfo;

export const demoItem = {
  result: {
    data: {
      GA: 3,
      uin: 378226,
      compcnt: 0,
      world: '1',
      stockValid: 0,
      comp: 0,
      pricePerUnit: null,
      parent: 0,
      addToCart: 1,
      ship: '0',
      uinsql: '347311',
      price: 13790,
      eilatPrice: 11686,
      name: '\u05db\u05e8\u05d8\u05d9\u05e1 \u05de\u05e1\u05da PNY RTX 5090 ARGB OC Triple Fan 32GB GDDR7',
      smalldesc:
        '\u05db\u05e8\u05d8\u05d9\u05e1 \u05de\u05e1\u05da \u05e2\u05d5\u05e6\u05de\u05ea\u05d9 GeForce RTX\u2122 5090 \u05de\u05d1\u05d9\u05ea PNY \u05e2\u05dd 32GB \u05d6\u05d9\u05db\u05e8\u05d5\u05df \u05de\u05d5\u05d1\u05e0\u05d4, \u05d9\u05e6\u05d9\u05d0\u05d5\u05ea 3xDP \u05d5-HDMI. \u05d1\u05e2\u05dc 3 \u05de\u05d0\u05d5\u05d5\u05e8\u05e8\u05d9\u05dd \u05de\u05d5\u05d1\u05e0\u05d9\u05dd.',
      brandName: 'PNY',
      brandTag: '51',
      brandImg: 'https://ksp.co.il/images/brands/51.png?v=250925',
      minQnt: '1',
      maxQnt: '1',
      disPayments: '2',
      dontAssemble: false,
      dcExtra: '0',
      dcBid: false,
      hidePrice: false,
      maxPaymentsWithoutVat: '15',
      cheaperPriceViaPhone: '0',
      note: '',
      is_dynamic_parent: false,
    },
    tags: [
      {
        up_uin: '215',
        up_name: '\u05e2\u05d5\u05dc\u05dd',
        uin: '31635',
        tag_name:
          '\u05de\u05d7\u05e9\u05d1\u05d9\u05dd \u05d5\u05e1\u05dc\u05d5\u05dc\u05e8',
        uin_item: '378226',
      },
      {
        up_uin: '58245',
        up_name: '\u05e7\u05d8\u05dc\u05d5\u05d2',
        uin: '61615',
        tag_name:
          '\u05e8\u05db\u05d9\u05d1\u05d9 \u05d7\u05d5\u05de\u05e8\u05d4 \u05d5\u05ea\u05d5\u05db\u05e0\u05d5\u05ea',
        uin_item: '378226',
      },
      {
        up_uin: '1',
        up_name: '\u05e7\u05d8\u05dc\u05d5\u05d2 \u05de\u05e9\u05e0\u05d9',
        uin: '35',
        tag_name: '\u05db\u05e8\u05d8\u05d9\u05e1\u05d9 \u05de\u05e1\u05da',
        uin_item: '378226',
      },
      {
        up_uin: '22',
        up_name: '\u05e1\u05d5\u05d2',
        uin: '201',
        tag_name: 'nVidia',
        uin_item: '378226',
      },
      {
        up_uin: '852',
        up_name: '\u05db\u05e8\u05d8\u05d9\u05e1 \u05de\u05e1\u05da',
        uin: '73804',
        tag_name: 'Nvidia GeForce RTX 5090',
        uin_item: '378226',
      },
      {
        up_uin: '5530',
        up_name:
          '\u05d6\u05d9\u05db\u05e8\u05d5\u05df \u05db\u05e8\u05d8\u05d9\u05e1 \u05de\u05e1\u05da',
        uin: '73809',
        tag_name: '32GB',
        uin_item: '378226',
      },
      {
        up_uin: '26',
        up_name: '\u05e2\u05e8\u05db\u05ea \u05e9\u05d1\u05d1\u05d9\u05dd',
        uin: '165',
        tag_name: 'GeForce',
        uin_item: '378226',
      },
      {
        up_uin: '28',
        up_name: '\u05d7\u05d9\u05d1\u05d5\u05e8\u05d9\u05dd',
        uin: '123,2121',
        tag_name: 'HDMI,3x DisplayPort',
        uin_item: '378226',
      },
      {
        up_uin: '9334',
        up_name: '\u05d9\u05d1\u05d5\u05d0\u05df',
        uin: '9335',
        tag_name: '\u05d9\u05d1\u05d5\u05d0\u05df \u05e8\u05e9\u05de\u05d9',
        uin_item: '378226',
      },
    ],
    payments: {
      perPayment: '919',
      max_wo: '15',
    },
    share: {
      1: {
        name: 'SMS',
        icon: 'https://ksp.co.il/m/img/icons/message.png',
        url: 'sms:?&body=\u05db\u05e8\u05d8\u05d9\u05e1 \u05de\u05e1\u05da PNY RTX 5090 ARGB OC Triple Fan 32GB GDDR7 \u05e2\u05db\u05e9\u05d9\u05d5 \u05d1\u05de\u05d7\u05d9\u05e8 \u05de\u05d9\u05d5\u05d7\u05d3 ! https://ksp.co.il/mob/item/378226/\u05db\u05e8\u05d8\u05d9\u05e1-\u05de\u05e1\u05da-pny-rtx-5090-argb-oc-triple-fan-32gb-gddr7',
        target: '',
      },
      2: {
        name: 'Whatsapp',
        icon: 'https://ksp.co.il/m/img/icons/whatsapp.png',
        url: 'whatsapp://send?text=%D7%9B%D7%A8%D7%98%D7%99%D7%A1%20%D7%9E%D7%A1%D7%9A%20PNY%20RTX%205090%20ARGB%20OC%20Triple%20Fan%2032GB%20GDDR7%20%D7%A2%D7%9B%D7%A9%D7%99%D7%95%20%D7%91%D7%9E%D7%97%D7%99%D7%A8%20%D7%9E%D7%99%D7%95%D7%97%D7%93%20%21%20https%3A%2F%2Fksp.co.il%2Fmob%2Fitem%2F378226%2F%D7%9B%D7%A8%D7%98%D7%99%D7%A1-%D7%9E%D7%A1%D7%9A-pny-rtx-5090-argb-oc-triple-fan-32gb-gddr7',
        target: '',
      },
      3: {
        name: 'Facebook',
        icon: 'https://ksp.co.il/m/img/icons/facebook.png',
        url: 'https://www.facebook.com/sharer/sharer.php?u=https://ksp.co.il/mob/item/378226/\u05db\u05e8\u05d8\u05d9\u05e1-\u05de\u05e1\u05da-pny-rtx-5090-argb-oc-triple-fan-32gb-gddr7&amp;facebook=OK',
        target: '_system',
      },
      4: {
        name: 'Mail',
        icon: 'https://ksp.co.il/m/img/icons/gmail.png',
        url: 'mailto:?subject=\u05db\u05e8\u05d8\u05d9\u05e1 \u05de\u05e1\u05da PNY RTX 5090 ARGB OC Triple Fan 32GB GDDR7&body=\u05db\u05e8\u05d8\u05d9\u05e1 \u05de\u05e1\u05da PNY RTX 5090 ARGB OC Triple Fan 32GB GDDR7 \n\r \u05dc\u05e4\u05e8\u05d8\u05d9\u05dd \u05d5\u05e8\u05db\u05d9\u05e9\u05d4 \u05d1\u05d0\u05ea\u05e8 KSP.co.il \n\r https://ksp.co.il/mob/item/378226',
        target: '',
      },
      5: {
        name: 'Telegram',
        icon: 'https://ksp.co.il/m/img/icons/telegram.png',
        url: 'https://telegram.me/share/url?url=https://ksp.co.il/mob/item/378226/\u05db\u05e8\u05d8\u05d9\u05e1-\u05de\u05e1\u05da-pny-rtx-5090-argb-oc-triple-fan-32gb-gddr7&text=\u05db\u05e8\u05d8\u05d9\u05e1 \u05de\u05e1\u05da PNY RTX 5090 ARGB OC Triple Fan 32GB GDDR7 \u05e2\u05db\u05e9\u05d9\u05d5 \u05d1\u05de\u05d7\u05d9\u05e8 \u05de\u05d9\u05d5\u05d7\u05d3 !',
        target: '_system',
      },
      6: {
        name: 'Print',
        icon: 'https://ksp.co.il/m/img/icons/printer.png',
        url: 'https://ksp.co.il/?print=378226',
        target: '_system',
      },
    },
    images: [
      {
        img_id: '1',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_1.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '90',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_1.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '498',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_1.jpg?v=1744116695',
            metadata: {
              width: '724',
              height: '656',
            },
          },
        },
      },
      {
        img_id: '2',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_2.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '87',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_2.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '483',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_2.jpg?v=1744116695',
            metadata: {
              width: '719',
              height: '632',
            },
          },
        },
      },
      {
        img_id: '3',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_3.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '78',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_3.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '434',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_3.jpg?v=1744116695',
            metadata: {
              width: '719',
              height: '568',
            },
          },
        },
      },
      {
        img_id: '4',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_4.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '44',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_4.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '246',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_4.jpg?v=1744116695',
            metadata: {
              width: '719',
              height: '322',
            },
          },
        },
      },
      {
        img_id: '5',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_5.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '60',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_5.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '332',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_5.jpg?v=1744116695',
            metadata: {
              width: '718',
              height: '434',
            },
          },
        },
      },
      {
        img_id: '6',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_6.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '55',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_6.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '306',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_6.jpg?v=1744116695',
            metadata: {
              width: '720',
              height: '401',
            },
          },
        },
      },
      {
        img_id: '7',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_7.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '38',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_7.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '213',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_7.jpg?v=1744116695',
            metadata: {
              width: '720',
              height: '280',
            },
          },
        },
      },
      {
        img_id: '8',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_8.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '21',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_8.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '115',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_8.jpg?v=1744116695',
            metadata: {
              width: '719',
              height: '151',
            },
          },
        },
      },
      {
        img_id: '9',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_9.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '46',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_9.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '258',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_9.jpg?v=1744116695',
            metadata: {
              width: '720',
              height: '338',
            },
          },
        },
      },
      {
        img_id: '10',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_10.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '44',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_10.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '245',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_10.jpg?v=1744116695',
            metadata: {
              width: '720',
              height: '321',
            },
          },
        },
      },
    ],
    videos: [],
    specification: {
      items: [
        {
          head: '\u05d0\u05d7\u05e8\u05d9\u05d5\u05ea ',
          body: '<div class="alignright">3 \u05e9\u05e0\u05d9\u05dd \u05d0\u05d7\u05e8\u05d9\u05d5\u05ea, \u05de\u05d9\u05de\u05d5\u05e9 \u05d0\u05d7\u05e8\u05d9\u05d5\u05ea \u05d1\u05e1\u05e0\u05d9\u05e4\u05d9 KSP<div></div>\n</div>',
        },
        {
          head: '\u05d3\u05d2\u05dd',
          body: '<p>VCG509032TFXXPB1-O</p>',
        },
        {
          head: '\u05e1\u05e7\u05d9\u05e8\u05d4',
          body: '<center><div style="padding: 10px;">\n<b style="color:black;font-size: 2em;">\u05db\u05e8\u05d8\u05d9\u05e1 \u05de\u05e1\u05da PNY GeForce RTX\u2122 5090</b><br>\u05d4-NVIDIA\u00ae GeForce RTX\u2122 5090 \u05d4\u05d5\u05d0 \u05de\u05db\u05e8\u05d8\u05d9\u05e1\u05d9 \u05d4\u05de\u05e1\u05da \u05d4\u05e2\u05d5\u05e6\u05de\u05ea\u05d9\u05d9\u05dd \u05d1\u05d9\u05d5\u05ea\u05e8 \u05e9-NVIDIA \u05d9\u05e6\u05e8\u05d4 \u05d0\u05d9 \u05e4\u05e2\u05dd \u05d5\u05de\u05d1\u05d9\u05d0\u05d4 \u05d9\u05db\u05d5\u05dc\u05d5\u05ea \u05de\u05d4\u05e4\u05db\u05e0\u05d9\u05d5\u05ea \u05dc\u05d2\u05d9\u05d9\u05de\u05e8\u05d9\u05dd \u05d5\u05d9\u05d5\u05e6\u05e8\u05d9\u05dd. \u05d4\u05ea\u05de\u05d5\u05d3\u05d3\u05d5 \u05e2\u05dd \u05d4\u05de\u05d5\u05d3\u05dc\u05d9\u05dd \u05d4\u05de\u05ea\u05e7\u05d3\u05de\u05d9\u05dd \u05d1\u05d9\u05d5\u05ea\u05e8 \u05d5\u05e2\u05dd \u05e2\u05d5\u05de\u05e1\u05d9 \u05d4\u05e2\u05d1\u05d5\u05d3\u05d4 \u05d4\u05d9\u05e6\u05d9\u05e8\u05ea\u05d9\u05d9\u05dd \u05d4\u05de\u05d0\u05ea\u05d2\u05e8\u05d9\u05dd \u05d1\u05d9\u05d5\u05ea\u05e8, \u05e2\u05dd \u05e2\u05d5\u05e6\u05de\u05ea \u05d1\u05d9\u05e0\u05d4 \u05de\u05dc\u05d0\u05db\u05d5\u05ea\u05d9\u05ea \u05d7\u05e1\u05e8\u05ea \u05ea\u05e7\u05d3\u05d9\u05dd. \u05e9\u05d7\u05e7\u05d5 \u05e2\u05dd Ray Tracing \u05de\u05dc\u05d0 \u05d5\u05e2\u05dd \u05d4\u05e9\u05d4\u05d9\u05d4 \u05de\u05d9\u05e0\u05d9\u05de\u05dc\u05d9\u05ea. \u05db\u05e8\u05d8\u05d9\u05e1 \u05d4\u05de\u05e1\u05da GeForce RTX 5090 \u05de\u05d5\u05e4\u05e2\u05dc \u05e2\u05dc \u05d9\u05d3\u05d9 \u05d0\u05e8\u05db\u05d9\u05d8\u05e7\u05d8\u05d5\u05e8\u05ea NVIDIA\u00ae Blackwell \u05d5\u05de\u05e6\u05d5\u05d9\u05d3 \u05d1\u05d6\u05d9\u05db\u05e8\u05d5\u05df \u05de\u05e1\u05d5\u05d2 GDDR7 \u05de\u05d4\u05d9\u05e8 \u05d1\u05de\u05d9\u05d5\u05d7\u05d3 \u2013 \u05db\u05da \u05e9\u05ea\u05d5\u05db\u05dc\u05d5 \u05dc\u05e2\u05e9\u05d5\u05ea \u05d4\u05db\u05dc.<br><img src="https://media.ksp.co.il/zwxttpbp53kisnh28gatr.png" alt="3-PNY-RTX-5090-ARGB-OC-EPIC-X-Triple-Fan-top.png" endimg=""><br>\u05de\u05e2\u05d1\u05e8 \u05dc\u05d1\u05d9\u05e6\u05d5\u05e2\u05d9\u05dd \u05d4\u05de\u05e8\u05e9\u05d9\u05de\u05d9\u05dd \u05db\u05d1\u05e8\u05d9\u05e8\u05ea \u05de\u05d7\u05d3\u05dc, \u05d4-RTX 5090 \u05de\u05e6\u05d9\u05e2 \u05d2\u05dd \u05e4\u05d5\u05d8\u05e0\u05e6\u05d9\u05d0\u05dc \u05d0\u05d3\u05d9\u05e8 \u05dc\u05d1\u05d9\u05e6\u05d5\u05e2 \u05d0\u05d5\u05d1\u05e8\u05e7\u05dc\u05d5\u05e7 (Overclock), \u05d4\u05de\u05d0\u05e4\u05e9\u05e8 \u05dc\u05d4\u05e2\u05dc\u05d5\u05ea \u05d0\u05ea \u05ea\u05d3\u05e8\u05d9 \u05d4\u05e2\u05d1\u05d5\u05d3\u05d4 \u05e9\u05dc \u05d4\u05db\u05e8\u05d8\u05d9\u05e1 \u05de\u05e2\u05d1\u05e8 \u05dc\u05d4\u05d2\u05d3\u05e8\u05d5\u05ea \u05d4\u05d9\u05e6\u05e8\u05df, \u05d5\u05dc\u05e7\u05d1\u05dc \u05d1\u05d9\u05e6\u05d5\u05e2\u05d9\u05dd \u05d2\u05d1\u05d5\u05d4\u05d9\u05dd \u05d0\u05e3 \u05d9\u05d5\u05ea\u05e8 \u05d1\u05de\u05e9\u05d7\u05e7\u05d9\u05dd \u05d5\u05d1\u05e2\u05d1\u05d5\u05d3\u05d5\u05ea \u05d2\u05e8\u05e4\u05d9\u05d5\u05ea \u05db\u05d1\u05d3\u05d5\u05ea. \u05ea\u05d4\u05dc\u05d9\u05da \u05d6\u05d4 \u05e0\u05ea\u05de\u05da \u05e2\u05dc \u05d9\u05d3\u05d9 \u05de\u05e2\u05e8\u05db\u05d5\u05ea \u05e0\u05d9\u05d4\u05d5\u05dc \u05d7\u05d5\u05dd \u05de\u05ea\u05e7\u05d3\u05de\u05d5\u05ea, \u05d5\u05de\u05d9\u05d5\u05e2\u05d3 \u05dc\u05de\u05e9\u05ea\u05de\u05e9\u05d9\u05dd \u05de\u05ea\u05e7\u05d3\u05de\u05d9\u05dd \u05e9\u05de\u05d1\u05e7\u05e9\u05d9\u05dd \u05dc\u05d3\u05d7\u05d5\u05e3 \u05d0\u05ea \u05d2\u05d1\u05d5\u05dc\u05d5\u05ea \u05d4\u05d1\u05d9\u05e6\u05d5\u05e2\u05d9\u05dd \u05e9\u05dc \u05d4\u05de\u05e2\u05e8\u05db\u05ea \u05e9\u05dc\u05d4\u05dd \u05ea\u05d5\u05da \u05e9\u05dc\u05d9\u05d8\u05d4 \u05de\u05dc\u05d0\u05d4 \u05e2\u05dc \u05d4\u05d8\u05de\u05e4\u05e8\u05d8\u05d5\u05e8\u05d5\u05ea \u05d5\u05d4\u05d9\u05e6\u05d9\u05d1\u05d5\u05ea.<br><img src="https://media.ksp.co.il/hvq2lv6g9er5tghuu2jna.png" alt="c] 10) (e15 RTX Powering Advanced Al" endimg=""><br>\n</div></center>',
        },
        {
          head: '\u05ea\u05db\u05d5\u05e0\u05d5\u05ea \u05d1\u05d5\u05dc\u05d8\u05d5\u05ea',
          body: '<p>\u25cf  \u05d0\u05e8\u05db\u05d9\u05d8\u05e7\u05d8\u05d5\u05e8\u05ea NVIDIA Blackwell \u05d4\u05d7\u05d3\u05e9\u05d4 \u05d4\u05de\u05e1\u05e4\u05e7\u05ea \u05e9\u05d3\u05e8\u05d5\u05d2 \u05de\u05e9\u05de\u05e2\u05d5\u05ea\u05d9 \u05d1\u05d1\u05d9\u05e6\u05d5\u05e2\u05d9\u05dd \u05d5\u05d1\u05d7\u05d9\u05e1\u05db\u05d5\u05df \u05d1\u05d0\u05e0\u05e8\u05d2\u05d9\u05d4.<br>\u25cf GDDR7 - \u05d6\u05d9\u05db\u05e8\u05d5\u05df \u05d2\u05e8\u05e4\u05d9 \u05de\u05d4\u05d9\u05e8 \u05d1\u05de\u05d9\u05d5\u05d7\u05d3 \u05dc\u05d0\u05d7\u05e1\u05d5\u05df \u05d5\u05d1\u05d9\u05e6\u05d5\u05e2\u05d9\u05dd \u05de\u05d3\u05d4\u05d9\u05de\u05d9\u05dd.  <br>\u25cf DLSS 4 - \u05de\u05d0\u05e4\u05e9\u05e8 \u05e9\u05d9\u05e4\u05d5\u05e8 \u05d1\u05d9\u05e6\u05d5\u05e2\u05d9\u05dd \u05d5\u05d2\u05e8\u05e4\u05d9\u05e7\u05d4 \u05d1\u05e2\u05d6\u05e8\u05ea \u05d1\u05d9\u05e0\u05d4 \u05de\u05dc\u05d0\u05db\u05d5\u05ea\u05d9\u05ea.  <br>\u25cf NVIDIA Reflex 2 - \u05de\u05e6\u05de\u05e6\u05dd \u05d0\u05ea \u05d6\u05de\u05df \u05d4\u05d4\u05e9\u05d4\u05d9\u05d4 \u05d5\u05de\u05e1\u05e4\u05e7 \u05e8\u05d9\u05e1\u05e4\u05d5\u05e0\u05e1\u05d9\u05d1\u05d9\u05d5\u05ea \u05d2\u05d1\u05d5\u05d4\u05d4 \u05d1\u05de\u05e9\u05d7\u05e7\u05d9\u05dd.  <br>\u25cf \u05de\u05de\u05e9\u05e7 PCI Express Gen 5 - \u05ea\u05d5\u05de\u05da \u05d1\u05de\u05d4\u05d9\u05e8\u05d5\u05ea \u05d7\u05d9\u05d1\u05d5\u05e8 \u05d2\u05d1\u05d5\u05d4\u05d4 \u05d1\u05d9\u05d5\u05ea\u05e8 \u05dc\u05d4\u05e2\u05d1\u05e8\u05ea \u05e0\u05ea\u05d5\u05e0\u05d9\u05dd \u05d1\u05d9\u05df \u05db\u05e8\u05d8\u05d9\u05e1 \u05d4\u05de\u05e1\u05da \u05dc\u05de\u05e2\u05e8\u05db\u05ea.  <br>\u25cf \u05de\u05e2\u05e8\u05db\u05ea \u05e7\u05d9\u05e8\u05d5\u05e8 \u05d1\u05e2\u05dc\u05ea 3 \u05de\u05d0\u05d5\u05d5\u05e8\u05e8\u05d9\u05dd - \u05de\u05e2\u05e8\u05db\u05ea \u05e7\u05d9\u05e8\u05d5\u05e8 \u05de\u05ea\u05e7\u05d3\u05de\u05ea \u05dc\u05e9\u05dc\u05d9\u05d8\u05d4 \u05e2\u05dc \u05d8\u05de\u05e4\u05e8\u05d8\u05d5\u05e8\u05d5\u05ea \u05d4\u05db\u05e8\u05d8\u05d9\u05e1.  <br>\u25cf \u05db\u05d5\u05dc\u05dc 21,760 \u05dc\u05d9\u05d1\u05d5\u05ea \u00aeCUDA - \u05dc\u05d1\u05d9\u05e6\u05d5\u05e2\u05d9 \u05e2\u05d9\u05d1\u05d5\u05d3 \u05de\u05e7\u05e1\u05d9\u05de\u05dc\u05d9\u05d9\u05dd \u05d1\u05de\u05e9\u05d7\u05e7\u05d9\u05dd \u05d5\u05d1\u05d9\u05d9\u05e9\u05d5\u05de\u05d9 \u05d2\u05e8\u05e4\u05d9\u05e7\u05d4 \u05de\u05ea\u05e7\u05d3\u05de\u05d9\u05dd.<br>\u25cf \u05e6\u05e8\u05d9\u05db\u05ea \u05d7\u05e9\u05de\u05dc \u05e9\u05dc 600W - \u05de\u05e6\u05d1\u05d9\u05e2\u05d4 \u05e2\u05dc \u05e2\u05d5\u05e6\u05de\u05d4 \u05d2\u05d1\u05d5\u05d4\u05d4 \u05d5\u05d3\u05d5\u05e8\u05e9\u05ea \u05de\u05e2\u05e8\u05db\u05ea \u05d7\u05e9\u05de\u05dc \u05ea\u05d5\u05d0\u05de\u05ea.</p>',
        },
        {
          head: '\u05de\u05e4\u05e8\u05d8',
          body: '<div class="alignleft">\n<b>Architecture</b><br>Blackwell<br><b>CUDA\u00ae Cores</b><br>21,760<br><b>Clock Speed</b><br>2.01 GHz<br><b>Memory Speed (Gbps)</b><br>28<br><b>Memory Size</b><br>32GB GDDR7<br><b>Memory Interface</b><br>512-bit<br><b>Memory Bandwidth (GB/sec)</b><br>1792<br><b>TDP</b><br>600 W<br><b>NVLink</b><br>Not Supported<br><b>Outputs</b><br>DisplayPort 2.1b (x3), HDMI 2.1b<br><b>Multi-Screen</b><br>4<br><b>Resolution</b><br>4K at 480Hz or 8K at 120Hz with DSC 3<br><b>Power Input</b><br>16-pin (One 16-pin to Four 8-pin)<br><b>Bus Type</b><br>PCI-Express 5.0 x16<br><b>Card Dimensions</b><br>12.94" x 5.42" x 2.8"; 3.5 Slot<br><b>System Requirements</b><br>PCI Express-compliant motherboard with one 3.5-width x16 graphics slot<br>Four 8-pin supplementary power connectors<br>Total graphics power 575 W<br>Required system power 1000 W2<br>Microsoft Windows\u00ae\u202f11 64-bit, Windows 10 (November 2018 or later) 64-bit, Linux 64-bit</div>',
        },
        {
          head: '\u05ea\u05db\u05d5\u05dc\u05d4',
          body: '<p>PNY GeForce RTX\u2122 5090 ARGB OC<br>1x Auxiliary Power Cable</p>',
        },
        {
          head: '\u05de\u05d9\u05d3\u05e2 \u05de\u05d4\u05d9\u05e6\u05e8\u05df\n',
          body: '<div class="alignright"><a href="https://www.pny.com/geforce-rtx-5090-models?sku=VCG509032TFXXPB1-O" target="_system" rel="_nofollow">\u05e7\u05d9\u05e9\u05d5\u05e8 \u05dc\u05de\u05d9\u05d3\u05e2 \u05e0\u05d5\u05e1\u05e3 \u05de\u05d0\u05ea\u05e8 \u05d4\u05d9\u05e6\u05e8\u05df \u05dc\u05d7\u05e6\u05d5 \u05db\u05d0\u05df</a></div>',
        },
      ],
      links: [
        {
          type: 'manufacturer',
          url: 'https://www.pny.com/geforce-rtx-5090-models?sku=VCG509032TFXXPB1-O',
        },
      ],
      modalName: 'VCG509032TFXXPB1-O',
    },
    specAlign: 'right',
    Lang: 'he',
    topNav: [
      {
        name: '\u05d3\u05e3 \u05d4\u05d1\u05d9\u05ea',
        url: '',
      },
      {
        name: '\u05de\u05d7\u05e9\u05d1\u05d9\u05dd \u05d5\u05e1\u05dc\u05d5\u05dc\u05e8',
        url: 'world/1',
      },
      {
        name: '\u05db\u05e8\u05d8\u05d9\u05e1\u05d9 \u05de\u05e1\u05da',
        url: 'cat/35',
      },
      {
        name: 'nVidia',
        url: 'cat/201',
      },
      {
        name: '\u05de\u05e7\u05d8: 347311',
        url: 'item/378226',
      },
    ],
    p: 12,
    flags: {
      1: {
        type: 'Payment',
        name: '\u05e2\u05d3 15 \u05ea\u05e9\u05dc\u05d5\u05de\u05d9\u05dd \u05dc\u05dc\u05d0 \u05e8\u05d9\u05d1\u05d9\u05ea*',
      },
    },
    benefitBox: {
      1: {
        type: 'Warranty',
        name: '\u05d0\u05d7\u05e8\u05d9\u05d5\u05ea  3 \u05e9\u05e0\u05d9\u05dd',
      },
      2: {
        type: 'Official',
        name: '\u05d9\u05d1\u05d5\u05d0\u05df \u05e8\u05e9\u05de\u05d9',
      },
    },
    similarItem: null,
    itemConst: {
      telephone_consultation: {
        open: false,
        price: '10000',
        excludeTags: [],
      },
      compare_price: {
        open: false,
        price: '1000',
        excludeTags: [6027, 7788, 11286],
      },
    },
    complementary_products: [],
    tradeInEligible: false,
    stock: [],
    Fx: 'Exist: KSP.API.UIN.378226.HE.W1.AP0.AF0',
    isPickup: 1,
    hool: false,
    delivery: [
      {
        hool: false,
        cont: '<b>* \u05d9\u05de\u05d9\u05dd - \u05de\u05ea\u05d9\u05d9\u05d7\u05e1 \u05dc\u05d9\u05de\u05d9 \u05e2\u05e1\u05e7\u05d9\u05dd \u05d4\u05d7\u05dc \u05de\u05e8\u05d2\u05e2 \u05d0\u05d9\u05e9\u05d5\u05e8 \u05d4\u05e2\u05e1\u05e7\u05d4 \u05d1\u05d7\u05d1\u05e8\u05ea \u05d4\u05d0\u05e9\u05e8\u05d0\u05d9</b><br><br>* \u05de\u05e1\u05e4\u05e8 \u05d9\u05de\u05d9 \u05de\u05e9\u05dc\u05d5\u05d7 \u05dc\u05de\u05e8\u05d1\u05d9\u05ea \u05e0\u05e7\u05d5\u05d3\u05d5\u05ea \u05d4\u05d0\u05d9\u05e1\u05d5\u05e3 (\u05e8\u05d0\u05d5 \u05e4\u05d9\u05e8\u05d5\u05d8 \u05d1\u05e2\u05d2\u05dc\u05ea \u05d4\u05e7\u05e0\u05d9\u05d5\u05ea)',
        place: null,
        price: '0',
        time: {
          min: 1,
          max: 6,
          full_text: null,
        },
        title:
          '\u05d0\u05d9\u05e1\u05d5\u05e3 \u05de\u05d4\u05e1\u05e0\u05d9\u05e3',
        type: 'PickUpKsp',
        pos: 1,
        settings: {
          min_order_value: null,
          max_order_value: null,
        },
      },
      {
        hool: false,
        cont: '<b>* \u05d9\u05de\u05d9\u05dd - \u05de\u05ea\u05d9\u05d9\u05d7\u05e1 \u05dc\u05d9\u05de\u05d9 \u05e2\u05e1\u05e7\u05d9\u05dd \u05d4\u05d7\u05dc \u05de\u05e8\u05d2\u05e2 \u05d0\u05d9\u05e9\u05d5\u05e8 \u05d4\u05e2\u05e1\u05e7\u05d4 \u05d1\u05d7\u05d1\u05e8\u05ea \u05d4\u05d0\u05e9\u05e8\u05d0\u05d9</b><br><br>*\u05d1\u05d9\u05e9\u05d5\u05d1\u05d9\u05dd \u05de\u05e8\u05d5\u05d7\u05e7\u05d9\u05dd \u05e4\u05e8\u05e7 \u05d4\u05d6\u05de\u05df \u05e2\u05dc\u05d5\u05dc \u05dc\u05d4\u05d9\u05d5\u05ea \u05d0\u05e8\u05d5\u05da \u05d9\u05d5\u05ea\u05e8',
        place: null,
        price: '28',
        time: {
          min: 1,
          max: 8,
          full_text: null,
        },
        title:
          '\u05de\u05e9\u05dc\u05d5\u05d7 \u05dc\u05d1\u05d9\u05ea \u05d4\u05dc\u05e7\u05d5\u05d7',
        type: 'direct',
        pos: 3,
        settings: {
          min_order_value: null,
          max_order_value: null,
        },
      },
      {
        hool: false,
        cont: '\u05de\u05ea\u05db\u05e0\u05e0\u05d9\u05dd \u05d1\u05d9\u05e7\u05d5\u05e8 \u05d1\u05d0\u05d9\u05dc\u05ea?\n\n<br><br>\u05d1\u05d0\u05e4\u05e9\u05e8\u05d5\u05ea\u05db\u05dd \u05dc\u05d4\u05d6\u05de\u05d9\u05df \u05d0\u05ea \u05d4\u05de\u05d5\u05e6\u05e8\u05d9\u05dd \u05dc\u05e4\u05e0\u05d9 \u05d4\u05d2\u05e2\u05ea\u05db\u05dd \u05dc\u05d0\u05d9\u05dc\u05ea \u05d5\u05d4\u05de\u05d5\u05e6\u05e8\u05d9\u05dd \u05d9\u05de\u05ea\u05d9\u05e0\u05d5 \u05e2\u05d1\u05d5\u05e8\u05db\u05dd \u05d1\u05e1\u05e0\u05d9\u05e3. \n\n<br><br><b>\u05e4\u05e9\u05d5\u05d8 \u05d1\u05d7\u05e8\u05d5 \u05d0\u05ea \u05d4\u05de\u05d5\u05e6\u05e8\u05d9\u05dd \u05e9\u05d1\u05e8\u05e6\u05d5\u05e0\u05db\u05dd \u05dc\u05e8\u05db\u05d5\u05e9 \u05d1\u05d0\u05d9\u05dc\u05ea \u05d5\u05d1\u05d7\u05e8\u05d5 \u05d1\u05d0\u05e4\u05e9\u05e8\u05d5\u05ea "\u05d0\u05d9\u05e1\u05d5\u05e3 \u05d1\u05d0\u05d9\u05dc\u05ea" \u05d1\u05e2\u05d2\u05dc\u05ea \u05d4\u05e7\u05e0\u05d9\u05d5\u05ea \u05d5\u05e6\u05d9\u05d9\u05e0\u05d5 \u05e1\u05e0\u05d9\u05e3 \u05d4\u05d0\u05d9\u05e1\u05d5\u05e3.</b>\n\n<br><br>\u05d1\u05e2\u05ea \u05e1\u05d9\u05d5\u05dd \u05d4\u05d4\u05d6\u05de\u05e0\u05d4 \u05ea\u05ea\u05d1\u05e7\u05e9\u05d5 \u05dc\u05de\u05dc\u05d0 \u05e4\u05e8\u05d8\u05d9 \u05db\u05e8\u05d8\u05d9\u05e1 \u05d0\u05e9\u05e8\u05d0\u05d9 \u05db\u05d0\u05de\u05e6\u05e2\u05d9 \u05d1\u05d9\u05d8\u05d7\u05d5\u05df \u05d1\u05dc\u05d1\u05d3.<br>*\u05d1\u05d4\u05ea\u05d0\u05dd \u05dc\u05de\u05dc\u05d0\u05d9 \u05d4\u05d6\u05de\u05d9\u05df \u05d1\u05e1\u05e0\u05d9\u05e4\u05d9\u05dd \u05d4\u05ea\u05d5\u05de\u05db\u05d9\u05dd \u05d1\u05e9\u05d9\u05e8\u05d5\u05ea',
        place: null,
        price: '0',
        time: {
          min: '1',
          max: '14',
          full_text: null,
        },
        title: '\u05e9\u05e8\u05d9\u05d5\u05df \u05d1\u05d0\u05d9\u05dc\u05ea',
        type: 'EilatReserve',
        pos: 5,
        settings: {
          min_order_value: null,
          max_order_value: null,
        },
      },
    ],
    bms: {
      378226: {
        uin: 378226,
        price: 13790,
        icons: ['https://ksp.co.il/site/siteUpload/benefit173729559123601.gif'],
        iconsDetails: [
          {
            icon: 'https://ksp.co.il/site/siteUpload/benefit173729559123601.gif',
            campaignId: 30319,
            campaignType: 5,
            campaignName:
              '\u05e7\u05d5\u05e4\u05d5\u05df \u05d1\u05dc\u05e2\u05d3\u05d9 \u05dc\u05d7\u05d1\u05e8\u05d9 \u05d4\u05d8\u05dc\u05d2\u05e8\u05dd! \u05e7\u05d1\u05dc\u05d5 \u20aa50 \u05d4\u05e0\u05d7\u05d4 \u05de\u05d9\u05d9\u05d3\u05d9\u05ea \u05d1\u05e8\u05db\u05d9\u05e9\u05d4 \u05de\u05e2\u05dc \u20aa499 \u05de\u05d4\u05de\u05d5\u05e6\u05e8\u05d9\u05dd \u05d4\u05de\u05e9\u05ea\u05ea\u05e4\u05d9\u05dd \u05d1\u05de\u05d1\u05e6\u05e2 (\u05dc\u05dc\u05d0 \u05db\u05e4\u05dc \u05de\u05d1\u05e6\u05e2\u05d9\u05dd, \u05e7\u05d5\u05e4\u05d5\u05e0\u05d9\u05dd, \u05d4\u05e0\u05d7\u05d5\u05ea \u05d5\u05d4\u05e6\u05e2\u05d5\u05ea "\u05d4\u05d7\u05dc \u05de-") \u05d4\u05e6\u05d8\u05e8\u05e4\u05d5 \u05e2\u05db\u05e9\u05d9\u05d5 >>',
            banner:
              'https://ksp.co.il/site/siteUpload/benefit175722421945047.jpg',
            href: 'http://ksp.co.il/link/JoinTelegram',
          },
        ],
        triggered: [
          {
            name: '\u05e7\u05d5\u05e4\u05d5\u05df \u05d1\u05dc\u05e2\u05d3\u05d9 \u05dc\u05d7\u05d1\u05e8\u05d9 \u05d4\u05d8\u05dc\u05d2\u05e8\u05dd! \u05e7\u05d1\u05dc\u05d5 \u20aa50 \u05d4\u05e0\u05d7\u05d4 \u05de\u05d9\u05d9\u05d3\u05d9\u05ea \u05d1\u05e8\u05db\u05d9\u05e9\u05d4 \u05de\u05e2\u05dc \u20aa499 \u05de\u05d4\u05de\u05d5\u05e6\u05e8\u05d9\u05dd \u05d4\u05de\u05e9\u05ea\u05ea\u05e4\u05d9\u05dd \u05d1\u05de\u05d1\u05e6\u05e2 (\u05dc\u05dc\u05d0 \u05db\u05e4\u05dc \u05de\u05d1\u05e6\u05e2\u05d9\u05dd, \u05e7\u05d5\u05e4\u05d5\u05e0\u05d9\u05dd, \u05d4\u05e0\u05d7\u05d5\u05ea \u05d5\u05d4\u05e6\u05e2\u05d5\u05ea "\u05d4\u05d7\u05dc \u05de-") \u05d4\u05e6\u05d8\u05e8\u05e4\u05d5 \u05e2\u05db\u05e9\u05d9\u05d5 >>',
            campaignId: '30319',
            banner:
              'https://ksp.co.il/site/siteUpload/benefit175722421945047.jpg',
            href: 'http://ksp.co.il/link/JoinTelegram',
            target: '_system',
          },
        ],
        eilat_price: 11686,
        payments: {
          perPayment: '919',
          max_wo: '15',
        },
        fdi: {
          status: false,
          price: null,
        },
      },
    },
    blenderPricing: {
      12: 1248,
      24: 674,
      36: 482,
    },
    coupon: null,
    cheaperPriceViaPhone: 0,
    redMsg: false,
  },
  time: 1758825583,
  seo: {
    type: 'item',
    myUrl: 'https://ksp.co.il/mob/item/378226',
    redisKey: 'KSP.API.SEO.he.item.378226',
    header: {
      title:
        '\u05db\u05e8\u05d8\u05d9\u05e1 \u05de\u05e1\u05da PNY RTX 5090 ARGB OC Triple Fan 32GB',
      canonical: 'https://ksp.co.il/mob/item/378226',
      favicon: 'https://ksp.co.il/favicon.ico',
      og: {
        description:
          '\u05db\u05e8\u05d8\u05d9\u05e1 \u05de\u05e1\u05da \u05e2\u05d5\u05e6\u05de\u05ea\u05d9 GeForce RTX\u2122 5090 \u05de\u05d1\u05d9\u05ea PNY \u05e2\u05dd 32GB \u05d6\u05d9\u05db\u05e8\u05d5\u05df \u05de\u05d5\u05d1\u05e0\u05d4, \u05d9\u05e6\u05d9\u05d0\u05d5\u05ea 3xDP \u05d5-HDMI. \u05d1\u05e2\u05dc 3 \u05de\u05d0\u05d5\u05d5\u05e8\u05e8\u05d9\u05dd \u05de\u05d5\u05d1\u05e0\u05d9\u05dd.',
        image: 'https://ksp.co.il/shop/items/512/378226.jpg',
        url: 'https://ksp.co.il/mob/item/378226',
      },
    },
    schema:
      '<div itemtype="http://schema.org/Product" itemscope>\n        <meta itemprop="name" content="\u05db\u05e8\u05d8\u05d9\u05e1 \u05de\u05e1\u05da PNY RTX 5090 ARGB OC Triple Fan 32GB" />\n        <link itemprop="image" href="https://ksp.co.il/shop/items/512/378226.jpg" />\n        <meta itemprop="description" content="\u05db\u05e8\u05d8\u05d9\u05e1 \u05de\u05e1\u05da \u05e2\u05d5\u05e6\u05de\u05ea\u05d9 GeForce RTX\u2122 5090 \u05de\u05d1\u05d9\u05ea PNY \u05e2\u05dd 32GB \u05d6\u05d9\u05db\u05e8\u05d5\u05df \u05de\u05d5\u05d1\u05e0\u05d4, \u05d9\u05e6\u05d9\u05d0\u05d5\u05ea 3xDP \u05d5-HDMI. \u05d1\u05e2\u05dc 3 \u05de\u05d0\u05d5\u05d5\u05e8\u05e8\u05d9\u05dd \u05de\u05d5\u05d1\u05e0\u05d9\u05dd." />\n        <div itemprop="offers" itemtype="http://schema.org/Offer" itemscope>\n            <link itemprop="url" href="https://ksp.co.il/mob/item/378226" />\n            <meta itemprop="itemCondition" itemtype="https://schema.org/OfferItemCondition" content="https://schema.org/NewCondition"/>\n            <meta itemprop="availability" content="https://schema.org/InStock" />\n            <meta itemprop="price" content="13790" />\n            <meta itemprop="priceCurrency" content="ILS" />\n            <meta itemprop="priceValidUntil" content="2025-09-28" />\n            <meta itemprop="url" content="https://ksp.co.il/mob/item/378226" />\n        </div>\n        <div itemprop="brand" itemtype="http://schema.org/Brand" itemscope>\n            <meta itemprop="name" content="PNY" />\n        </div>\n        <meta itemprop="sku" content="347311" />\n    </div>',
    meta: [
      {
        key: 'name',
        value: 'description',
        content: '',
      },
      {
        key: 'property',
        value: 'og:description',
        content:
          '\u05db\u05e8\u05d8\u05d9\u05e1 \u05de\u05e1\u05da \u05e2\u05d5\u05e6\u05de\u05ea\u05d9 GeForce RTX\u2122 5090 \u05de\u05d1\u05d9\u05ea PNY \u05e2\u05dd 32GB \u05d6\u05d9\u05db\u05e8\u05d5\u05df \u05de\u05d5\u05d1\u05e0\u05d4, \u05d9\u05e6\u05d9\u05d0\u05d5\u05ea 3xDP \u05d5-HDMI. \u05d1\u05e2\u05dc 3 \u05de\u05d0\u05d5\u05d5\u05e8\u05e8\u05d9\u05dd \u05de\u05d5\u05d1\u05e0\u05d9\u05dd.',
      },
      {
        key: 'property',
        value: 'og:image',
        content: 'https://ksp.co.il/shop/items/512/378226.jpg',
      },
      {
        key: 'property',
        value: 'og:url',
        content: 'https://ksp.co.il/mob/item/378226',
      },
      {
        key: 'name',
        value: 'facebook-domain-verification',
        content: '17e6yrz9wan61aqdqg8nuuq5hc6yvs',
      },
    ],
    cache: true,
  },
  breadCrumbs: [
    {
      name: '\u05d3\u05e3 \u05d4\u05d1\u05d9\u05ea',
      url: '',
    },
    {
      name: '\u05de\u05d7\u05e9\u05d1\u05d9\u05dd \u05d5\u05e1\u05dc\u05d5\u05dc\u05e8',
      url: 'world/1',
    },
    {
      name: '\u05db\u05e8\u05d8\u05d9\u05e1\u05d9 \u05de\u05e1\u05da',
      url: 'cat/35',
    },
    {
      name: 'nVidia',
      url: 'cat/201',
    },
    {
      name: '\u05de\u05e7\u05d8: 347311',
      url: 'item/378226',
    },
  ],
};
