package com.agilefox;

import com.agilefox.model.Edge;
import com.agilefox.model.Node.*;
import com.agilefox.model.Practice;
import com.agilefox.repository.PracticeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class AgilestudioApplication {

	public static void main(String[] args) {
		SpringApplication.run(AgilestudioApplication.class, args);
	}


//	@Bean
//	CommandLineRunner commandLineRunner(PracticeRepository practiceRepository) {
//		return args -> {
//			Position position1 = new Position(810.14F, 462);
//			IconComponent iconComponent1 = new IconComponent(
//					"/_next/static/media/Practice.b55070fd.svg",
//					171,
//					192,
//					null,
//					0,
//					0
//			);
//			NodeData nodeData1 = new NodeData("Practice", "practice", iconComponent1);
//			Measured measured1 = new Measured(96, 120);
//			Node node1 = new Node("node-1", position1, "iconNode", nodeData1, measured1, true, false);
//
//			Position position2 = new Position(315.15F, 240);
//			IconComponent iconComponent2 = new IconComponent(
//					"/_next/static/media/Activity.7f55a0a4.svg",
//					187,
//					120,
//					null,
//					0,
//					0
//			);
//			NodeData nodeData2 = new NodeData("activity", "activity", iconComponent2);
//			Measured measured2 = new Measured(96, 120);
//			Node node2 = new Node("node-2", position2, "iconNode", nodeData2, measured2, false, false);
//
//			Position position3 = new Position(1291.15F, 273);
//			IconComponent iconComponent3 = new IconComponent(
//					"/_next/static/media/Work Product.d9e7d1b8.svg",
//					150,
//					200,
//					null,
//					0,
//					0
//			);
//			NodeData nodeData3 = new NodeData("workproduct", "workproduct", iconComponent3);
//			Measured measured3 = new Measured(96, 120);
//			Node node3 = new Node("node-3", position3, "iconNode", nodeData3, measured3, false, false);
//
//			Edge edge1 = new Edge("node-2", "top-source", "node-1", "top-source", "xy-edge__node-2top-source-node-1top-source");
//			Edge edge2 = new Edge("node-1", "top-source", "node-3", "top-source", "xy-edge__node-1top-source-node-3top-source");
//
//			Node[] nodes = new Node[]{node1, node2, node3};
//			Edge[] edges = new Edge[]{edge1, edge2};
//			Practice practice = new Practice("ceva", 12,  nodes, edges);
//
//			practiceRepository.insert(practice);
//		};
//	}
}
