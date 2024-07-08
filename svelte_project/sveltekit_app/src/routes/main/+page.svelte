<script>
    import { goto } from '$app/navigation';
	import UserAPI from  '../../../src/api/server/user-api';
	import AccountAPI from  '../../../src/api/server/account-api';
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
        Dropdown,
        DropdownMenu,
        DropdownItem,
        DropdownToggle,
		Form,
		Input,
        Row,
        Table
	} from '@sveltestrap/sveltestrap'
	let name = "Todo App";
	let selectData = [];
   
	let txtUserId;
	let txtUserNm;
	let txtPasswd;

    let txtTelNo;
    let txtEmail;
    let txtPostNo;
    let txtAddr1;
    let txtAddr2;

	let btnSubmit;

	const typeA = 4;
	const typeA1 = 3;
	const typeA2 = 9;
	function reList() {
		
		UserAPI.lookup("").then(response => {
			var res = response.data.data;
			selectData = res;

			selectData = selectData.map((e) => {
				e.CONTENT = JSON.parse(e.CONTENT);
				return e;
			});
            /* if (res.code === 200) {
                if(res.data.length > 0) {
                   
                }
            } */
		});

		/* axios({
            method: "get",
            url: "http://localhost:8888/users"
        })
		.then((rep) => { return rep.data; })
		.then((data) => {
			selectData = data;

			selectData = selectData.map((e) => {
				e.CONTENT = JSON.parse(e.CONTENT);
				return e;
			});
		}); */
	}

	function writeComment() {
		let form = document.getElementById("form_comment");
		let userId = txtUserId.value;
		let userNm = txtUserNm.value;
		let passwd = txtPasswd.value;

		let btnSubmit = document.getElementById("btnSubmit");
		let type = btnSubmit.getAttribute("data-key");

		let methodNm = (type == "1" ? "post" : "put"); // 1: insert[post] , 2: update[put]

		let content = {
			telNo  : txtTelNo.value,
			email : txtEmail.value,
			postNo : txtPostNo.value,
			addr1 : txtAddr1.value,
			addr2 : txtAddr2.value
		};

		let body = {
			userId: userId,
			userNm: userNm,
			passwd: passwd,
			content: content
		};

		if (userId == null || userId == "") {
            alert("사용자 아이디를 입력하세요.");
            return;
        }

        if (userNm == null || userNm == "") {
            alert("이름을 입력하세요.");
            return;
        }

		if(type == 1){ //insert
			let query = "userId="+userId;
			AccountAPI.lookup(query).then(response => {
				var cnt = response.data.cnt;
				if(cnt > 0){
					alert("아이디가 중복되었습니다.");
					return;
				}

				UserAPI.add(body).then(response => {
					if(response.data.code == "200"){
						window.location.reload();
					}else{
						alert("저장에 실패하였습니다.");
					}
				});
			});
		}else{
			UserAPI.update(body).then(response => {
				if(response.data.code == "200"){
					window.location.reload();
				}else{
					alert("수정에 실패하였습니다.");
				}
				
			});
		}
	}

	/* function submitLogin(userId,userNm,passwd,content,methodNm){
		axios({
            method: methodNm,
            url: "http://localhost:8888/users/inAndUp",
            data: {
                userId: userId,
                userNm: userNm,
                passwd: passwd,
                content: content
            }
        })
		.then((rep) => { return rep.data; })
		.then((data) => {
			window.location.reload();
		});
	} */

	function updateComment(user) {
		txtUserId.value = user.USER_ID;
		txtUserNm.value = user.USER_NM;
		txtPasswd.value = user.PASSWD;

		txtTelNo.value = user.CONTENT.telNo;
		txtEmail.value = user.CONTENT.email;
		txtPostNo.value = user.CONTENT.postNo;
		txtAddr1.value = user.CONTENT.addr1;
		txtAddr2.value = user.CONTENT.addr2;

		txtUserId.readOnly = true;
		btnSubmit.innerHTML = "수정";
		btnSubmit.setAttribute("data-key", "2");

	}

    function logoutComment() {
        goto("../");
    }

	import {onMount} from 'svelte';
	import axios from 'axios';

	onMount(async()=>{
		txtUserId = document.querySelector("[name=userId]");
		txtUserNm = document.querySelector("[name=userNm]");
		txtPasswd = document.querySelector("input[name=passwd]");

        txtTelNo = document.querySelector("input[name=telNo");
        txtEmail = document.querySelector("input[name=email");
        txtPostNo = document.querySelector("input[name=postNo");
        txtAddr1 = document.querySelector("input[name=addr1");
        txtAddr2 = document.querySelector("input[name=addr2");

		btnSubmit = document.getElementById("btnSubmit");

		reList();
	})

	function deleteComment(user){
		var userId = user.USER_ID;

		let query = "userId="+userId;
		UserAPI.delete(query).then(response => {
			if(response.data.code == "200"){
				alert("정상적으로 삭제되었습니다.");
				window.location.reload();
			}else{
				alert("삭제에 실패하였습니다.");
			}
		});
	}

</script>

<html lang="ko">
	<head>
		<title> 아이디 {name} </title>
	</head>
	<body>
		<div>
			<Form id="form_comment">
				<Row>
					<Col lg={typeA}>
						<Card>
							<CardHeader> 
								<CardTitle>아이디 등록</CardTitle>
							</CardHeader>
							<CardBody> 
								<Row>
									<Col lg={typeA1}>
										<span>사용자 아이디<span class="text-danger">*</span></span>
									</Col>
									<Col lg={typeA2}>
										<Input name="userId" id="userId" type="text" placeholder="사용자 아이디"> </Input>
									</Col>
								</Row>
								<hr />
								<Row>
									<Col lg={typeA1}>
										<span>사용자 이름<span class="text-danger">*</span></span>
									</Col>
									<Col lg={typeA2}>
										<Input name="userNm" id="userNm" type="text" placeholder="사용자 이름"> </Input>
									</Col>
								</Row>
								<hr />
								<Row>
									<Col lg={typeA1}>
										<span>비밀번호<span class="text-danger">*</span></span>
									</Col>
									<Col lg={typeA2}>
										<Input name="passwd" id="passwd" type="password" placeholder="비밀번호"> </Input>
									</Col>
								</Row>
								<hr />
								<Row>
									<Col lg={typeA1}>
										<span>핸드폰</span>
									</Col>
									<Col lg={typeA2}>
										<Input name="telNo" id="telNo" type="text" placeholder="핸드폰"> </Input>
									</Col>
								</Row>
								<hr />
								<Row>
									<Col lg={typeA1}>
										<span>이메일</span>
									</Col>
									<Col lg={typeA2}>
										<Input name="email" id="email" type="text" placeholder="이메일"> </Input>
									</Col>
								</Row>
								<hr />
								<Row>
									<Col lg={typeA1}>
										<span>우편번호</span>
									</Col>
									<Col lg={typeA2}>
										<Input name="postNo" id="postNo" type="text" placeholder="우편번호" readonly> </Input>
									</Col>
								</Row>
								<hr />
								<Row>
									<Col lg={typeA1}>
										<span>주소</span>
									</Col>
									<Col lg={typeA2}>
										<div class="input-group">
											<Input name="addr1" id="addr1" type="text" placeholder="주소" readonly> </Input>
											<!-- <Button type="button" on:click={findAddr}>검색</Button> -->
										</div>
										
									</Col>
								</Row>
								<hr />
								<Row>
									<Col lg={typeA1}>
										<span>상세주소</span>
									</Col>
									<Col lg={typeA2}>
										<div class="input-group">
											<Input name="addr2" id="addr2" type="text" class="w-75"  placeholder="상세주소" readonly> </Input>
										</div>
									</Col>
								</Row>
							</CardBody>
							<CardFooter>
								<Button type="button" id="btnSubmit" class="form-inline" data-key="1" on:click={() => writeComment()} color="success">등록</Button>
							</CardFooter>
						</Card>
					</Col>
					<Col auto>
						<Card>
							<CardHeader> 
								<CardTitle>사용자 목록</CardTitle>
							</CardHeader>
							<CardBody>
								<Table id="visitr_list" border="1" cellspacing="0" cellpadding="5">
									<thead>
										<tr>
											<th style="text-align: center;">No</th>
											<th style="text-align: center;">작성자</th>
											<th>핸드폰</th>
											<th>이메일</th>
											<th>우편번호</th>
											<th>주소</th>
											<th>등록일자</th>
											<th style="text-align: center;">수정</th>
											<th style="text-align: center;">삭제</th>
										</tr>
									</thead>
									<tbody id="userInfo">
										{#each selectData as user}
											<tr>
												<td style="text-align: center;">
													{user.USER_ID}
												</td>
												<td style="text-align: center;">
													{user.USER_NM}
												</td>
												<td>{user.CONTENT.telNo}</td>
												<td>{user.CONTENT.email}</td>
												<td>{user.CONTENT.postNo}</td>
												<td>{user.CONTENT.addr1}&nbsp;{user.CONTENT.addr2}</td>
												<td>{user.REG_DATE}</td>
												<td><Button class="w-100 btn-warning" type="button" on:click={() => updateComment(user)}>수정</Button></td>
												<td><Button class="w-100 btn-danger" type="button" on:click={() => deleteComment(user)}>삭제</Button></td>
											</tr>
										{/each}
									</tbody>
								</Table>
							</CardBody>
						</Card>
					</Col>
				</Row>
				
			</Form>
		</div>
		<br>
        <Button type="button" id="btnLogout" style="margin-left:18px;" data-key="1" on:click={() => logoutComment()}>로그아웃</Button>
	</body>
</html>

<style>
	tbody{
		font-size:14px;
	}
	tr{
		vertical-align:middle;
	}
</style>