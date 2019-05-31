import React from "react";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/es/Typography/Typography";
import TextField from "@material-ui/core/es/TextField/TextField";

class TeacherPage extends React.Component {

	render() {
		return (
			<>
				<Typography variant={"h3"} align={"center"}>Quiz editor </Typography>
				<Grid container spacing={24}>
					<Grid item xs={3}>
						<List component="nav">
							<ListItem button>
								<ListItemIcon>
									{1}
								</ListItemIcon>
								<ListItemText primary="Question"/>
							</ListItem>
							<ListItem button>
								<ListItemIcon>
									{2}
								</ListItemIcon>
								<ListItemText primary="Question"/>
							</ListItem>
						</List>
					</Grid>
					<Grid item xs={9}>
						<Typography>Enter the question</Typography>
						<TextField/>
					</Grid>
				</Grid>
			</>
		);
	}
}

export default TeacherPage;