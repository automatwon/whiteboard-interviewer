<?php 
	include 'api/Utils/DBConnectionHelper.php';
?>
<!DOCTYPE html>
<html>
	<head>
		<title>Whiteboard Interview</title>

   		<meta name="viewport" content="width=device-width, initial-scale=1.0">
   		<!-- Bootstrap -->
    	<link href="css/bootstrap.min.css" rel="stylesheet" media="screen">
    	<link rel="stylesheet" href="css/supersized.core.css" media="screen"/>
    	<style>
    		.navbar {
    			margin-top: 10px;
    		}
    		.navbar button {
    			margin-left: 2px;
    			margin-right: 6px;
    			margin-top: 8px;
    			margin-bottom: 8px;
    		}
  
    	</style>
	</head>
	<body>
		<div class="container">
			<nav class="navbar navbar-default navbar-inverse" role="navigation">
			  <!-- Brand and toggle get grouped for better mobile display -->
			  <div class="navbar-header">
			    <a class="navbar-brand" href="#">Whiteboard Interviewer</a>
			  </div>

			  <!-- Collect the nav links, forms, and other content for toggling -->
			  <div class="collapse navbar-collapse navbar-ex1-collapse">
			    <ul class="nav navbar-nav">
			      <li class="active"><a href="#">Intro</a></li>
			      <li><a href="#">Team</a></li>
			      <li><a href="#">Contact</a></li>
			    </ul>
			    <ul class="nav navbar-nav navbar-right">
			      <li><button type="button" class="btn btn-danger">Create Session</button></li>
			      <li><button data-toggle="modal" href="#myModal" class="btn btn-primary">Join Session</button>

			    </ul>
			  </div><!-- /.navbar-collapse -->
			</nav>

			<!-- put content here -->
		    <div class="container">
				<div class="jumbotron">
					<div class="row featurette">
						<div class="col-md-7">
							<h2 class="featurette-heading">More code,<span class="text-muted"> less logistics.</span></h2>
					          <p class="lead">Coding interviews are hard enough. And it definitely does not need to be made difficult by logistics. 
					 		</p>
						</div>
						<div class="col-md-5">
							<img class="featurette-image img-rounded" src="img/coding.png">
       					</div>
       				</div>
       				<div class="row">
       						<h2 class="featurette-heading">Data Source "Hello World"<span class="text-muted"> pulled from MySQL DB.</span></h2>
							<table class="table table-bordered">
								<caption>table: interviews</caption>
								<tr>
									<th>interviews.id</th>
									<th>interviews.title</th>
								</tr>

								<?php
								// The following HTML codes are a bit reduntant, but it's fine since we just
								// want to make sure that our db connection works.
								try {
									DBConnectionHelper::initialize();
									$query = "select * from interviews limit 5";
									$rows = DBConnectionHelper::executeQuery($query);
									foreach ($rows as $row) { ?>
										<tr>
											<td><?=$row["id"]?></td>
											<td><?=$row["title"]?></td>
										</tr>
									<?php }
								} catch (PDOException $ex) {
									echo $ex->getMessage();
								}
			 					?>

							</table>
					
							<table class="table table-bordered">
								<caption>table: participants</caption>
								<tr>
									<th>participants.interview_id</th>
									<th>participants.interviewer_id</th>
									<th>participants.interviewee_id</th>
								</tr>
								<?php
								try {
									DBConnectionHelper::initialize();
									$query = "select * from participants limit 5";
									$rows = DBConnectionHelper::executeQuery($query);
									foreach ($rows as $row) { ?>
										<tr>
											<td><?=$row["interview_id"]?></td>
											<td><?=$row["interviewer_id"]?></td>
											<td><?=$row["interviewee_id"]?></td>
										</tr>
									<?php }
								} catch (PDOException $ex) {
									echo $ex->getMessage();
								}
			 					?>
							</table>
       				</div><!-- end featurette row -->
				</div>
				
				
			</div> <!-- /container -->
		</div><!-- /container -->

		<!-- Button trigger modal -->
		<!-- Modal - Triggered by clicking join session -->
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title">Enter Session ID</h4>
					</div>
					<div class="modal-body">
						Text Here
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
						<button type="button" class="btn btn-primary">Submit</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal-dialog -->
		</div><!-- /.modal -->
		
		

		<!-- Load JS Assets Last, rather than in HEAD. Prevents DOM blocking -->
		<script src="js/jquery.min.js"></script>
		<script src="js/bootstrap.min.js"></script>
		<script src="js/supersized.min.js"></script>
		<script src="js/helloworld.js"></script>
	</body>
</html>