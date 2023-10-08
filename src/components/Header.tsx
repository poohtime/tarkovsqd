import { Box, Container, Heading, HStack, Text } from '@chakra-ui/react';

import useStatusStore from '../store/useStatusStore';
import { useNavigate } from 'react-router';

export default function Header() {
	
	const { online } = useStatusStore();
	const navigate   = useNavigate()
	
	return (
		<Box w={ '100%' }
		     bgColor={ 'black' }
		     boxShadow={ '0 0 100px rgba(65,61,52,1), 0 0 6px rgba(232,190,107,0.8)' }
		     zIndex={ 10 }>
			<Container maxW={ '1200px'} p={ '24px 16px 24px 16px' }>
				<HStack spacing={ 4 } w={ '100%' } justifyContent={ 'space-between' }>
					<Heading as={ 'h1' }
					         fontFamily={ 'Chakra Petch' }
					         fontSize={ '28px' }
					         fontWeight={ 'bold' }
					         letterSpacing={ '-1px' }
					         color={ '#9A8866' }>Tarkov SQUAD</Heading>
					<HStack>
						<Text color={ '#9a8866' } letterSpacing={ '-1px' } fontSize={ '14px' }>실시간 스쿼드 이용자: </Text>
						{
							online > 0 ? <Text fontWeight={ 'bold' } color={ 'green' } fontSize={ '15px' }>{ online }</Text>
								: <Text fontSize={ '15px' } color={ 'gray' } fontWeight={ 'bold' }>0</Text>
						}
					</HStack>
				</HStack>
			</Container>
			<Box w={'100%'} borderTop={'1px solid #101010'}>
				<Container maxW={'1200px'} p={'24px 16px 24px 16px'}>
					<HStack spacing={10} h={'100%'}>
						<Text
							onClick={() => navigate('/')} 
							fontSize={'14px'} color={ '#9A8866' } cursor={'pointer'}>팀원찾기</Text>
						<Text 
							onClick={() => navigate('/market')}
							fontSize={'14px'} color={ '#9A8866' } cursor={'pointer'}>암시장</Text>
					</HStack>
				</Container>
			</Box>
		</Box>
	);
}