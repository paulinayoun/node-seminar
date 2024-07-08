<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import axios from 'axios'; //../axiosModule.js
	import LoginAPI from '../../src/api/server/login-api';
	import {
		Button,
		Card,
		CardHeader,
		CardTitle,
		CardBody,
		CardFooter,
		CardSubtitle,
		CardText,
		Col,
		Container,
		Form,
		Input,
		Row
	} from '@sveltestrap/sveltestrap';
	let txtUserId;
	let txtPasswd;

	onMount(async () => {
		txtUserId = document.querySelector('input[name=userId]');
		txtPasswd = document.querySelector('input[name=passwd]');
	});

	function handleNewAccount() {
		goto('../new_account');
	}

	function handleLogin() {
		// 로그인 성공 후 다른 페이지로 이동
		// 예: '/dashboard'로 이동

		let userId = txtUserId.value;
		let passwd = txtPasswd.value;

		if (userId == null || userId == '') {
			alert('아이디를 입력하세요.');
			return;
		} else if (passwd == null || passwd == '') {
			alert('비밀번호를 입력하세요.');
			return;
		}

		let body = {
			userId: userId,
			passwd: passwd
		};

		LoginAPI.lookup(body).then((response) => {
			let resultCd = response.data.code;

			if (resultCd == 200) {
				let cnt = response.data.cnt; //data[0].
				console.log('resultCd: ' + resultCd);
				if (cnt > 0) {
					goto('../main');
				} else {
					alert('아이디 혹은 비밀번호가 일치하지 않습니다.');
				}
			} else {
				alert('로그인 조회에 실패하였습니다.');
			}
		});

		/*  axios({
        method: "post",
        url: "http://127.0.0.1:8888/login",
        data:{
            userId: userId,
            passwd: passwd
        }
      })
        .then((rep) => { return rep.data; })
        .then((data) => {
            let cnt = data[0].cnt;

            if(cnt > 0){
                goto('../main');
            }else{
                alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
            }
        }); */
	}
</script>

<Form id="form_comment" class="w-1/2 px-4 space-y-4">
	<Row class="justify-content-center" style="padding-top:100px;">
		<Col lg={6}>
			<Card>
				<CardHeader>
					<CardTitle>Login Page</CardTitle>
				</CardHeader>
				<CardBody>
					<Row>
						<Col lg={4}>
							<label for="userId">아이디</label>
						</Col>
						<Col lg={8}>
							<Input type="text" id="userId" class="w-50" name="userId" autocomplete="off"></Input>
						</Col>
					</Row>
					<br />
					<Row>
						<Col lg={4}>
							<label for="passwd">비밀번호</label>
						</Col>
						<Col lg={8}>
							<Input
								type="password"
								id="passwd"
								class="w-50"
								name="passwd"
								autocomplete="off"
							></Input>
						</Col>
					</Row>
				</CardBody>
				<CardFooter>
					<!-- 로그인 버튼 또는 어떠한 로그인 UI 요소도 추가 가능 -->
					<Row>
						<Col lg={6} sm={6}>
							<Button type="button" on:click={handleLogin} color="success">Login</Button>
						</Col>
						<Col lg={6} sm={6}>
							<Button type="button" on:click={handleNewAccount} color="primary">회원가입</Button>
						</Col>
					</Row>
				</CardFooter>
			</Card>
		</Col>
	</Row>
</Form>
