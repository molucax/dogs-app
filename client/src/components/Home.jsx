// import React from "react";
// import Card from "./Home/Card.jsx";
// import { useSelector, useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { getAllDogs, settingPage } from "../redux/actions/index.js";
// import Nav from "./Home/Nav.jsx";
// import img from "../assets/dogdb.png";
// import loading from "../assets/loading.gif";
// import styled from "styled-components";

// const Home = () => {
//   const dispatch = useDispatch();
//   const { dogs, page, name, order, temperament, origin } = useSelector(
//     (state) => state
//   );

//   useEffect(() => {
//     dispatch(getAllDogs({}));
//   }, [dispatch]);

//   const changePage = (page) => {
//     dispatch(settingPage(page));
//     dispatch(getAllDogs({ name, order, temperament, origin }));
//   };

//   return (
//     <Wrapper>
//       {" "}
//       <Nav />
//       {/* ----------------- PAGINADO Y CARDS ------------------ */}
//       <RightContainer>
//         {" "}
//         <BtnContainer>
//           {" "}
//           <Button 
//             disabled={page - 1 === 0}
//             onClick={() => {
//               changePage(page - 1);
//             }}
//           >
//             ◀
//           </Button>
//         </BtnContainer>
//         <Right>
//           {" "}
//           <PageContainer>
//             {" "}
//             <Page>{page}</Page>
//           </PageContainer>
//           <Mapdogs>
//             {" "}
//             {dogs?.sliced?.length ? (
//               dogs.sliced.map((e) => {
//                 return (
//                   <Card
//                     image={e.image ? e.image : img}
//                     name={e.name}
//                     key={e.id}
//                     id={e.id}
//                     temperament={e.temperament ? e.temperament : "Unknown"}
//                     weight={e.weight}
//                     height={e.height}
//                   />
//                 );
//               })
//             ) : (
//               <LoadingDiv>
//                 {" "}
//                 {
//                   !dogs?.error ? (
//                     <img
//                       src={loading}
//                       alt="Loading..."
//                       width="200px"
//                       height="120px"
//                     />
//                   ) : (
//                     <Nomatch>
//                       Sorry, we couldn't find any dog that matches.
//                     </Nomatch>
//                   )
//                 }
//               </LoadingDiv>
//             )}
//           </Mapdogs>
//         </Right>
//         <BtnContainerR>
//           {" "}
//           <Button
//             disabled={dogs?.count <= page * 8}
//             onClick={() => {
//               changePage(page + 1);
//             }}
//           >
//             ▶
//           </Button>
//         </BtnContainerR>
//       </RightContainer>
//     </Wrapper>
//   );
// };

// export default Home;

// const Wrapper = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: row;
//   justify-content: space-evenly;
//   background: transparent;
// `;
// const RightContainer = styled.div`
//   width: 63vw;
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   background-color: rgba(14, 14, 14, 0.644);
//   padding: 10px;
//   background: transparent;
// `;
// const BtnContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   padding-right: 30px;
// `;
// const Button = styled.button`
//   background-color: rgba(136, 136, 136, 0.253);
//   width: 60px;
//   height: 30px;
//   border-style: none;
//   border-radius: 5px;
//   font-size: large;
//   &:hover {
//     background-color: rgba(136, 136, 136, 0.5);
//   }
// `;
// const PageContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   padding-bottom: 10px;
// `;
// const Page = styled.label`
//   background-color: rgba(136, 136, 136, 0.253);
//   width: 40px;
//   height: 35px;
//   text-align: center;
//   font-weight: 700;
//   font-size: x-large;
//   border-radius: 5px;
// `;
// const Mapdogs = styled.div`
//   display: flex;
//   max-width: 100%;
//   max-height: 100%;
//   height: 92.5%;
//   width: 100%;
//   flex-wrap: wrap;
//   justify-content: center;
//   overflow-y: scroll;
// `;
// const Right = styled.div`
//   width: 650px;
// `;
// const LoadingDiv = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   text-align: center;
// `;
// const Nomatch = styled.h2`
//   color: white;
//   padding: 10px;
// `;
// const BtnContainerR = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   padding-left: 40px;
// `;
