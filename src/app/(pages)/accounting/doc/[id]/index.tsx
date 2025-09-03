// import {  NextPage } from 'next'
// import { Detail, Header, VoucherItem, VoucherList } from '@/interfaces'
// import Document from '../../../../../components/Accounting/Doc'
// interface Props {
//   header: VoucherList
//   details: VoucherItem[]
// }
// const ShowDoc: NextPage<Props> = ({ header, details }) => {
//   return <> {header && <Document header={header} details={details} />} </>
// }
// export default ShowDoc

//  const getProps = async ({
//   params,
// }) => {
//   const title = params?.id as string
//   console.log(params)
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_APP_URL}/api/data/Post/Client/page`,
//     {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         title: title,
//         authType: 'G&E!T*P^R$O#D$U^C@T*S',
//       }),
//     }
//   )
//   const postData = await res.json()
//   return {
//     props: {
//       post: postData.products, // Assuming your API response has a "products" field
//     },
//   }
// }
