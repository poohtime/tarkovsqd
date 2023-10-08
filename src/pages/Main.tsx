import {
	Avatar,
	Box,
	Button,
	Center,
	Container,
	HStack,
	Image,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tooltip,
	Tr,
	useDisclosure,
	useToast,
	VStack,
} from '@chakra-ui/react';

import MapSelector from '../components/MapSelector';
import RegionSelector from '../components/RegionSelector';
import TeamCreateModal from '../components/TeamCreateModal';
import LoginModal from '../components/LoginModal';
import usePostStore from '../store/usePostStore';

import strip from '../resource/strip.png';
import bg from '../resource/bg.png';
import kr from '../resource/kr.png';
import us from '../resource/us.png';
import jp from '../resource/jp.png';
import rs from '../resource/rs.png';
import aus from '../resource/aus.png';

import gun from '../resource/icon/gun.png';
import money from '../resource/icon/money.png';
import boss from '../resource/icon/boss.png';
import quest from '../resource/icon/quest.png';


import PlayTypeSelector from '../components/PlayTypeSelector';
import { useEffect } from 'react';
import { API_SERVER } from '../application';
import axios from 'axios';
import useFilterStore from '../store/useFilterStore';
import FunctionMenu from '../components/FunctionMenu';

export default function Main() {
	
	const toast = useToast();
	const loginModal = useDisclosure();
	const teamModal = useDisclosure();
	
	const { posts, initPosts } = usePostStore();
	const { map, server, type } = useFilterStore();
	
	const openModal = () => {
		const token = localStorage.getItem('squadObject');
		
		if (token === null) {
			loginModal.onOpen();
			return;
		}
		
		teamModal.onOpen();
	};
	
	const handleCopyClipBoard = async (e: any) => {
		try {
			await navigator.clipboard.writeText(e.target.innerHTML);
			
			toast({
				title: '디스코드 아이디가 복사되었어요',
				status: 'info',
			});
		} catch (error) {
			alert('클립보드 복사에 실패하였습니다.');
		}
	};
	
	const searchQueryGenerator = () => {
		const query = new URLSearchParams();
		if (map !== null) {
			query.append('map', map);
		}
		if (server !== null) {
			query.append('server', server);
		}
		if (type !== null) {
			query.append('type', type);
		}
		return query.toString();
	};
	
	const onResetFilterClick = () => {
		axios.get(API_SERVER + '/post').then(res => {
			initPosts(res.data.content);
		});
	};
	
	useEffect(() => {
		console.log(API_SERVER + '/post?' + searchQueryGenerator());
		axios.get(API_SERVER + '/post?' + searchQueryGenerator()).then(res => {
			initPosts(res.data.content);
		});
	}, [ map, server, type ]);
	
	return (
		<Box w={ '100%' }
			zIndex={1}
		     bgColor={ 'black' }
		     backgroundImage={ bg }
		     backgroundSize={ 'cover' }
		     backgroundRepeat={ 'no-repeat' }
		     backgroundAttachment={ 'fixed' }
		     pb={ '400px' }>
			<LoginModal onClose={ loginModal.onClose } isOpen={ loginModal.isOpen } teamModalOpen={ teamModal.onOpen } />
			<TeamCreateModal onClose={ teamModal.onClose } isOpen={ teamModal.isOpen } />
			<Container maxW={ '1200px' } pt={ 8 }>
				<HStack justifyContent={ 'space-between' } pt={ 5 }>
					<HStack spacing={ 4 }>
						{/* <Tooltip fontSize={ '12px' } label={ '필터 초기화' }>
							<Box bgColor={ '#121211' }
							     border={ '1px solid #9A8866' }
							     cursor={ 'pointer' }
							     onClick={ onResetFilterClick }>
								<Image alt="초기화" p={ '6px' } src={ reset } h={ '38px' } w={ '39px' } />
							</Box>
						</Tooltip> */ }
						<PlayTypeSelector isFilter={ true } />
						<MapSelector isFilter={ true } />
						<RegionSelector isFilter={ true } />
					</HStack>
					<Button fontSize={ '14px' }
					        bgColor={ '#9A8866' }
					        color={ '#29241D' }
					        borderRadius={ 0 }
					        fontWeight={ 'bold' }
					        letterSpacing={ '-1px' }
					        onClick={ openModal }>팀원 찾기</Button>
				</HStack>
				<Box bgColor={ '#171715' } mt={ 6 }>
					<TableContainer w={ '100%' }>
						<Table>
							<Thead bgImage={ strip }>
								<Tr>
									<Th textShadow={ '1px 1px 1px rgba(0,0,0,.004)' }
									    w={ '250px' }
									    fontSize={ '11px' }
									    color={ '#9A8866' }>디스코드</Th>
									<Th textShadow={ '1px 1px 1px rgba(0,0,0,.004)' }
									    w={ '180px' }
									    fontSize={ '11px' }
									    color={ '#9A8866' }>맵</Th>
									<Th textShadow={ '1px 1px 1px rgba(0,0,0,.004)' }
									    w={ '180px' }
									    fontSize={ '11px' }
									    color={ '#9A8866' }>플레이 유형</Th>
									<Th textShadow={ '1px 1px 1px rgba(0,0,0,.004)' } w={ '200px' } color={ '#9A8866' }>서버</Th>
									<Th textShadow={ '1px 1px 1px rgba(0,0,0,.004)' }
									    fontSize={ '11px' }
									    color={ '#9A8866' }
									    w={ '450px' }>메모</Th>
									<Th textShadow={ '1px 1px 1px rgba(0,0,0,.004)' } fontSize={ '11px' } color={ '#9A8866' }>등록 시간</Th>
									<Th textShadow={ '1px 1px 1px rgba(0,0,0,.004)' } fontSize={ '11px' } color={ '#9A8866' }>기능</Th>
								</Tr>
							</Thead>
							<Tbody>
								{ posts && posts.map(p =>
									<Tr fontSize={ '12px' } bgColor={ '#151515' }>
										<Td>
											<HStack spacing={ 2 }>
												<Avatar size={ 'sm' } src={ p.avatar_url } />
												<VStack spacing={ 0 } alignItems={ 'flex-start' }>
													<Tooltip fontSize={ '12px' } bgColor={ '#9a8866' } color={ '#373128' } label={ '아이디 복사' }>
														<Text color={ '#9A8866' }
														      cursor={ 'pointer' }
														      fontWeight={ 'bold' }
														      onClick={ handleCopyClipBoard }>{ p.nickname }</Text>
													</Tooltip>
													{
														p.verify ? (
															<Text color={ '#5865f2' } fontSize={ '10px' } letterSpacing={ '-1px' }>디스코드 인증됨</Text>
														) : (
															<Text color={ 'gray' } fontSize={ '10px' } letterSpacing={ '-1px' }>디스코드 미인증</Text>
														)
													}
												</VStack>
											</HStack>
										</Td>
										
										<Td color={ '#AEAEB0' } fontWeight={ 'bold' }>{ p.map }</Td>
										
										{ p.type === '' && <Td color={ 'gray' }>미지정</Td> }
										{ p.type === '파밍' &&
											<Td color={ 'gold' }>
												<Tooltip bgColor={ '#9a8866' } color={ '#373128' } fontSize={ '12px' } label={ '파밍 위주 플레이' }>
													<Image alt="파밍" ml={ 2 } src={ money } h={ '21px' } w={ '18px' } /></Tooltip></Td> }
										{ p.type === '보스런' &&
											<Td color={ 'crimson' }>
												<Tooltip bgColor={ '#9a8866' } color={ '#373128' } fontSize={ '12px' } label={ '보스만 목표로 달린다' }>
													<Image alt="보스런" ml={ 1 } src={ boss } h={ '24px' } w={ '24px' } /></Tooltip></Td> }
										{ p.type === '교전' &&
											<Td color={ 'crimson' }>
												<Tooltip bgColor={ '#9a8866' } color={ '#373128' } fontSize={ '12px' } label={ '교전 위주 플레이' }>
													<Image alt="교전" ml={ 2 } src={ gun } h={ '27px' } w={ '25px' } /></Tooltip></Td> }
										{ p.type === '퀘스트' &&
											<Td color={ 'crimson' }>
												<Tooltip bgColor={ '#9a8866' } color={ '#373128' } fontSize={ '12px' } label={ '퀘스트 위주 플레이' }>
													<Image alt="퀘스트" ml={ 2 } src={ quest } h={ '20px' } w={ '19px' } /></Tooltip></Td> }
										
										{ p.server === '한국' && <Td>
											<HStack><Image alt="한국"
											               w={ '18px' }
											               h={ '18px' }
											               src={ kr } /><Text color={ '#AEAEB0' }>{ p.server }</Text></HStack></Td> }
										{ p.server === '호주' && <Td>
											<HStack><Image alt="호주"
											               w={ '18px' }
											               h={ '18px' }
											               src={ aus } /><Text color={ '#AEAEB0' }>{ p.server }</Text></HStack></Td> }
										{ p.server === '북미' && <Td color={ '#AEAEB0' }>
											<HStack><Image alt="북미"
											               w={ '18px' }
											               h={ '18px' }
											               src={ us } /><Text color={ '#AEAEB0' }>{ p.server }</Text></HStack></Td> }
										{ p.server === '일본' && <Td color={ '#AEAEB0' }>
											<HStack><Image alt="일본"
											               w={ '18px' }
											               h={ '18px' }
											               src={ jp } /><Text color={ '#AEAEB0' }>{ p.server }</Text></HStack></Td> }
										{ p.server === '러시아' && <Td color={ '#AEAEB0' }>
											<HStack><Image alt="러시아"
											               w={ '18px' }
											               h={ '18px' }
											               src={ rs } /><Text color={ '#AEAEB0' }>{ p.server }</Text></HStack></Td> }
										{ p.server === '상관없음' && <Td color={ '#AEAEB0' }>
											<HStack><Text color={ '#AEAEB0' }>{ p.server }</Text></HStack></Td> }
										
										<Td wordBreak={ 'break-all' } pr={ 10 }>
											<Box bgColor={ '#9a8866' } borderRadius={ 5 } p={ '8px 10px 8px 10px' }>
												<Text
													lineHeight={ '16px' }
													color={ '#373128' }
													whiteSpace={ 'normal' }
													fontWeight={ 'bold' }
													style={ {
														overflow: 'hidden',
														display: '-webkit-box',
														WebkitLineClamp: 2,
														WebkitBoxOrient: 'vertical',
														textOverflow: 'ellipsis',
													} }>{ p.memo }</Text>
											</Box>
										</Td>
										<Td color={ 'gray' }>{ p.time }</Td>
										<Td>
											<FunctionMenu UUID={ p.uuid } postId={ p.postId } />
										</Td>
									</Tr>) }
							</Tbody>
						</Table>
					</TableContainer>
					{ posts && posts.length <= 0 ?
						<>
							<Center h={ '100%' } p={ '200px 0 200px' }>
								<Text fontSize={ '24px' } color={ '#9A8866' } letterSpacing={ '-1px' }>아무런 데이터가 없음</Text>
							</Center>
						</> : null }
				</Box>
			</Container>
		</Box>
	);
}